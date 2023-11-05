import * as React from 'react';
import { IIconProps, IconButton, Stack, TextField, mergeStyleSets } from "@fluentui/react";
import { EventEmitter2 } from "eventemitter2";
import { ICVSimulationNodeDatum } from '../api/ForceGraph_CircleUI';
import { EventEnum } from '../api/EventEnum';

export interface IQuestionInputProps {
  onSend: (question: string) => void;
  disabled: boolean;
  placeholder?: string;
  clearOnSend?: boolean;
  emitter: EventEmitter2;
}

export const QuestionInput: React.FunctionComponent<IQuestionInputProps> = (props: IQuestionInputProps) => {
  const [question, setQuestion] = React.useState<string>("");

  React.useEffect(() => {
    props.emitter.on(EventEnum.CardClick, (node: ICVSimulationNodeDatum) => {
      setQuestion(question + node.name);
    });
  }, [question, props.emitter]);

  const sendQuestion = () => {
    if (props.disabled || !question.trim()) {
      return;
    }

    props.onSend(question);

    if (props.clearOnSend) {
      setQuestion("");
    }
  };

  const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
    if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
      sendQuestion();
    }
  };

  const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setQuestion(newValue || "");
  };

  const sendQuestionDisabled = props.disabled || !question.trim();

  return (
    <div className={contentStyles.questionInputContainer}>
      <Stack horizontal>
        <TextField
          className={contentStyles.questionInputTextArea}
          placeholder={props.placeholder}
          multiline
          rows={3}
          resizable={false}
          borderless
          value={question}
          onChange={onQuestionChange}
          onKeyDown={onEnterPress}
        />
        <div className={contentStyles.questionInputSendButtonContainer}
          role="button"
          tabIndex={0}
          aria-label="Ask question button"
          onClick={sendQuestion}
          onKeyDown={e => e.key === "Enter" || e.key === " " ? sendQuestion() : null}
        >
          <IconButton
            disabled={sendQuestionDisabled}
            className={(sendQuestionDisabled) ? contentStyles.questionInputSendButtonDisabled : contentStyles.questionInputSendButton}
            iconProps={SendIcon}
            size={64}
            ariaLabel="Send"
          />
        </div>
      </Stack>
      <div className={contentStyles.questionInputBottomBorder} />
    </div>
  );
};

const SendIcon: IIconProps = { iconName: "Send" };
const contentStyles = mergeStyleSets({
  questionInputContainer: {
    height: '84px',
    width: 'calc(100% - 80px)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
    borderRadius: '8px',
  },
  questionInputTextArea: {
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px',
    marginLeft: '12px',
    marginRight: '12px',

  },
  questionInputSendButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    right: '24px',
    bottom: '20px',
  },
  questionInputSendButton: {
    width: '24px',
    height: '23px',
    margin: '0px 8px 0px 0px',
  },
  questionInputSendButtonDisabled: {
    width: '24px',
    height: '23px',
    margin: '0px 8px 0px 0px',
    background: 'none',
    color: '#424242',
  },
  questionInputBottomBorder: {
    position: 'relative',
    bottom: '3px',
    width: '100%',
    height: '4px',
    background: 'radial-gradient(106.04% 106.06% at 100.1% 90.19%,#0F6CBD 33.63%,#8DDDD8 100%)',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
  },
  questionInputOptionsButton: {
    cursor: 'pointer',
    width: '27px',
    height: '30px',
  }
});