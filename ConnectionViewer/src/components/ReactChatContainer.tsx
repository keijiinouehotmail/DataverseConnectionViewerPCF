import * as React from 'react';
import {
  getTheme,
  mergeStyleSets,
  Stack,
  IconButton,
  IButtonStyles,
  CommandBarButton,
  IIconProps,
} from '@fluentui/react';
import { ChatMessage, ChatResponse, Conversation, ConversationRequest, ToolMessageContent } from '../api/modelsForChat';
import { IGPTRequest, IGPTResponseFunctionCall } from '../api/modelsForAOAI';
import { QuestionInput } from '../components/QuestionInput';
import { Answer } from '../components/Answer';
import { AzureOAIGPTStreamService } from '../services/AzureOAIGPTStreamService';
import { ImageResources } from '../api/ImageResources';
import { MyGeneralLibrary } from '../api/MyGeneralLibrary';
import { GPTFunctionNames, GPTPrompts } from '../api/GPTPrompts';
import { GPTFunctionDescribeConnections } from '../api/GPTFunctionDescribeConnections';
import { GPTFunctionAnalyzeImpactOfConnections } from '../api/GPTFunctionAnalyzeImpactOfConnections';
import { GPTFunctionExpandTheCardToACertainDistance } from '../api/GPTFunctionExpandTheCardToACertainDistance';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { registerIcons } from '@fluentui/react/lib/Styling';
import { SquareShapeIcon } from '@fluentui/react-icons-mdl2';
import { EventEmitter2 } from 'eventemitter2';
import { ConnectionViewer } from '../ConnectionViewer';

initializeIcons(/* optional base url */);
registerIcons({
  icons: {
    SquareShape: <SquareShapeIcon />,
  }
});
const enum messageStatus {
  NotRunning = "Not Running",
  Processing = "Processing",
  Done = "Done"
}

export interface IReactChatContainerProps {
  aoaiGPTStreamService: AzureOAIGPTStreamService;
  ns: string; // namespace
  parentHeight: number;
  isChatContainerOpen: boolean;
  hideChatContainer: () => void;
  emitter: EventEmitter2;
}

export const ReactChatContainer: React.FunctionComponent<IReactChatContainerProps> = (props: IReactChatContainerProps) => {
  const chatMessageStreamRef = React.useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const abortFuncs = React.useRef([] as AbortController[]);
  const [processMessages, setProcessMessages] = React.useState<messageStatus>(messageStatus.NotRunning);
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [clearingChat, setClearingChat] = React.useState<boolean>(false);

  const makeApiRequestWithoutCosmosDB = async (question: string) => {
    setIsLoading(true);
    const abortController = new AbortController();
    abortFuncs.current.unshift(abortController);

    const userMessage: ChatMessage = {
      id: MyGeneralLibrary.getNewGuid(),
      role: "user",
      content: question,
      date: new Date().toISOString(),
    };

    let conversation: Conversation | null | undefined;
    conversation = {
      id: MyGeneralLibrary.getNewGuid(),
      title: question,
      messages: [userMessage],
      date: new Date().toISOString(),
    }

    setMessages([...messages, userMessage]);

    const request: ConversationRequest = {
      messages: [...conversation.messages.filter((answer: any) => answer.role !== "error")]
    };

    let result = {} as ChatResponse;
    try {
      const aoaiRequest: IGPTRequest = {
        messages: [...request.messages.map((m) => { return { role: m.role, content: m.content }; })],
        functions: GPTPrompts.functions,
      };
      const functionCallOrResponse = await props.aoaiGPTStreamService.getResponse(aoaiRequest, abortController, messages, setMessages, userMessage, 0.9) as IGPTResponseFunctionCall;
      if (functionCallOrResponse.name) {
        // console.log('functionCall.name', functionCallOrResponse.name);
        // console.log(`functionCall.arguments`, functionCallOrResponse.arguments);
        if (functionCallOrResponse.name === GPTFunctionNames.describe_connections) {
          await GPTFunctionDescribeConnections.execute(
            props.aoaiGPTStreamService,
            abortFuncs,
            messages,
            setMessages,
            userMessage
          );
        } else if (functionCallOrResponse.name === GPTFunctionNames.analyze_impact_of_connections) {
          await GPTFunctionAnalyzeImpactOfConnections.execute(
            props.aoaiGPTStreamService,
            abortFuncs,
            messages,
            setMessages,
            userMessage,
            functionCallOrResponse.arguments
          );
        } else if (functionCallOrResponse.name === GPTFunctionNames.expand_the_card_to_a_certain_distance) {
          await GPTFunctionExpandTheCardToACertainDistance.execute(
            props.aoaiGPTStreamService,
            abortFuncs,
            messages,
            setMessages,
            userMessage,
            functionCallOrResponse.arguments
          );
        } else {
          console.error(`Function ${functionCallOrResponse.name} is not implemented yet.`);
        }
      }
    } catch (e) {
      if (!abortController.signal.aborted) {
        let errorMessage = "An error occurred. Please try again. If the problem persists, please contact the site administrator.";
        if (result.error?.message) {
          errorMessage = result.error.message;
        }
        else if (typeof result.error === "string") {
          errorMessage = result.error;
        }
        let errorChatMsg: ChatMessage = {
          id: MyGeneralLibrary.getNewGuid(),
          role: "error",
          content: errorMessage,
          date: new Date().toISOString()
        }
        conversation.messages.push(errorChatMsg);
        setMessages([...messages, errorChatMsg]);
      } else {
        setMessages([...messages, userMessage])
      }
    } finally {
      setIsLoading(false);
      abortFuncs.current = abortFuncs.current.filter(a => a !== abortController);
      setProcessMessages(messageStatus.Done)
    }

    return abortController.abort();
  };

  const newChat = () => {
    setProcessMessages(messageStatus.Processing)
    setMessages([])
    setProcessMessages(messageStatus.Done)
  };

  const stopGenerating = () => {
    abortFuncs.current.forEach(a => a.abort());
    setIsLoading(false);
  }

  React.useLayoutEffect(() => {
    chatMessageStreamRef.current?.scrollTo({
      top: chatMessageStreamRef.current?.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }, [processMessages, messages, props.isChatContainerOpen]);

  const parseCitationFromMessage = (message: ChatMessage) => {
    if (message?.role && message?.role === "tool") {
      try {
        const toolMessage = JSON.parse(message.content) as ToolMessageContent;
        return toolMessage.citations;
      }
      catch {
        return [];
      }
    }
    return [];
  }

  const disabledButton = () => {
    return isLoading || (messages && messages.length === 0) || clearingChat
  }

  return (
    <div id={`${props.ns}_ReactChatContainerDiv`} className={contentStyles.containerOuter} style={{ height: `${props.parentHeight}px` }} >
      {props.isChatContainerOpen && (
        <div className={contentStyles.containerInner} >
          <Stack horizontal className={contentStyles.headerContainer} horizontalAlign="space-between" verticalAlign="center">
            <span className={contentStyles.header}>
              {ConnectionViewer.cv.resStr('ChatWithAzureOpenAI')}
              </span>
            <IconButton
              styles={iconButtonStyles}
              iconProps={{ iconName: 'Cancel' }}
              onClick={props.hideChatContainer}
            />
          </Stack>
          <div className={contentStyles.chatContainer}>
            {!messages || messages.length < 1 ? (
              <Stack className={contentStyles.chatEmptyState}>
                <img
                  src={ImageResources.Azure_svg_url}
                  className={contentStyles.chatIcon}
                  aria-hidden="true"
                />
                <br />
                <h1 className={contentStyles.chatEmptyStateTitle}>
                  {ConnectionViewer.cv.resStr('StartChat')}
                  </h1>
                <br />
                <h2 className={contentStyles.chatEmptyStateSubtitle}>
                  {ConnectionViewer.cv.resStr('ThisChatbotWillAnswerYourQuestionsAboutTheStateOfTheConnectionsYouAreViewing')}
                </h2>
              </Stack>
            ) : (
              <div ref={chatMessageStreamRef} className={contentStyles.chatMessageStream} style={{ marginBottom: isLoading ? "40px" : "0px" }} role="log">
                {messages.map((answer, index) => (
                  <div key={answer.id}>
                    {answer.role === "user" ? (
                      <div className={contentStyles.chatMessageUser} tabIndex={0}>
                        <div className={contentStyles.chatMessageUserMessage}>{answer.content}</div>
                      </div>
                    ) : (
                      answer.role === "assistant" ?
                        <div className={contentStyles.chatMessageGpt}>
                          <Answer
                            answer={{
                              answer: answer.content,
                            }}
                          />
                        </div> : answer.role === "error" ?
                          <div className={contentStyles.chatMessageError}>
                            <span className={contentStyles.chatMessageErrorMessage}>{answer.content}</span>
                          </div> : null
                    )}
                  </div>
                ))}
              </div>
            )}
            <Stack horizontal className={contentStyles.chatInput}>
              {isLoading && (
                <Stack
                  horizontal
                  className={contentStyles.stopGeneratingContainer}
                  role="button"
                  aria-label=
                  {ConnectionViewer.cv.resStr('StopGenerating')}
                  tabIndex={0}
                  onClick={stopGenerating}
                  onKeyDown={e => e.key === "Enter" || e.key === " " ? stopGenerating() : null}
                >
                  <SquareShapeIcon className={contentStyles.stopGeneratingIcon} />
                  <span className={contentStyles.stopGeneratingText} aria-hidden="true">
                    {ConnectionViewer.cv.resStr('StopGenerating')}
                    </span>
                </Stack>
              )}
              <CommandBarButton
                role="button"
                styles={{
                  icon: {
                    color: '#FFFFFF',
                  },
                  root: {
                    color: '#FFFFFF',
                    background: disabledButton() ? "#88888822" : "radial-gradient(109.81% 107.82% at 100.1% 90.19%, #0F6CBD 33.63%, #2D87C3 70.31%, #8DDDD8 100%)",
                    cursor: disabledButton() ? "" : "pointer"
                  },
                }}
                className={contentStyles.clearChatBroomNoCosmos}
                iconProps={BroomIcon}
                onClick={newChat}
                disabled={disabledButton()}
                aria-label="clear chat button"
              />
              <QuestionInput
                clearOnSend
                placeholder=
                {ConnectionViewer.cv.resStr('PleaseEnterYourQuestion')}
                disabled={false}
                onSend={(question) => {
                  makeApiRequestWithoutCosmosDB(question);
                }}
                emitter={props.emitter}
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
};

const contentStyles = mergeStyleSets({
  containerOuter: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    width: '500px',
  },
  containerInner: {
    flex: 'auto',
    margin: '4px',
    height: 'calc(100% - 8px - 16px)',
    alignItems: 'flex-start',
    padding: '8px 8px',
    gap: '8px',
    background: 'radial-gradient(61% 89% at 100% 100%,rgba(210,240,250,.07) 0,rgba(30,220,220,.07) 43%,rgba(32,230,230,0) 100%),radial-gradient(47% 64% at 61% 100%,rgba(21,75,229,.07) 0,rgba(23,74,228,0) 100%),linear-gradient(170deg,rgba(23,74,229,0) 30%,rgba(23,75,229,.05)),linear-gradient(120deg,#f5f5f7,#ecf0fa)',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
    borderRadius: '8px 0px 0px 8px',
    order: '0',
    overflowY: 'auto',
    pointerEvents: 'all',
  },
  headerContainer: {
    width: '100%',
  },
  header: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '24px',
    color: '#000000',
    flex: 'none',
    order: '0',
    flexGrow: '0',
  },
  chatIcon: {
    height: '62px',
    width: '62px',
  },
  chatMessageUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '12px',
    padding: '0px 16px 0px 16px',
  },
  chatMessageUserMessage: {
    padding: '10px',
    textAlign: 'left',
    background: '#EDF5FD',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#242424',
    order: '0',
    flexGrow: '0',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    maxWidth: '80%',
  },
  chatMessageGpt: {
    justifyContent: 'flex-start',
    marginBottom: '12px',
    padding: '0px 16px 0px 16px',
    maxWidth: '80%',
  },
  chatMessageError: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '12px',
    padding: '0px 16px 0px 16px',
  },
  chatMessageErrorMessage: {
    padding: '10px',
    textAlign: 'left',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#242424',
    order: '0',
    flexGrow: '0',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    maxWidth: '80%',
    border: '1px solid red',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'calc(100% - 8px - 16px - 10px)',
    background: 'radial-gradient(108.78% 108.78% at 50.02% 19.78%, #FFFFFF 57.29%, #EEF6FE 100%)',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
    borderRadius: '8px',
    overflowY: 'auto',
  },
  chatMessageStream: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1028px',
    width: '100%',
    overflowY: 'auto',
    marginTop: '24px',
  },
  chatInput: {
    position: 'sticky',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '8px',
    width: 'calc(100% - 20px)',
    maxWidth: '1028px',
    marginBottom: '8px',
    marginTop: '8px',
  },
  clearChatBroomNoCosmos: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    color: '#FFFFFF',
    border: '1px solid #D1D1D1',
    borderRadius: '4px',
    zIndex: '1',
  },
  chatEmptyState: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
  },

  chatEmptyStateTitle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'flex-end',
    textAlign: 'center',
    lineHeight: '24px',
    marginTop: '36px',
    marginBottom: '0px',
  },
  chatEmptyStateSubtitle: {
    marginTop: '20px',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '150%',
    display: 'flex',
    alignItems: 'flex-end',
    textAlign: 'center',
    letterSpacing: '-0.01em',
    color: '#616161',
  },
  stopGeneratingContainer: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px 16px',
    gap: '4px',
    position: 'absolute',
    width: '161px',
    height: '32px',
    left: 'calc(50% - 161px/2 + 25.8px)',
    bottom: '116px',
    border: '1px solid #D1D1D1',
    borderRadius: '16px',
  },
  stopGeneratingIcon: {
    width: '14px',
    height: '14px',
    color: '#424242',
  },
  stopGeneratingText: {
    width: '103px',
    height: '20px',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
    color: '#242424',
    flex: 'none',
    order: '0',
    flexGrow: '0',
  },
});
const theme = getTheme();
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    pointerEvents: 'all',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
    backgroundColor: theme.palette.themeLighterAlt,
  },
};
const BroomIcon: IIconProps = { iconName: "Broom" };
