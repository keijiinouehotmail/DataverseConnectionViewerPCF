import * as React from 'react';
import { useBoolean } from '@fluentui/react-hooks';
import { ReactConnDescs } from './ReactConnDescs';
import { ReactOptionsContainer } from './ReactOptionsContainer';
import { IButtonStyles, IIconProps, IStackTokens, IconButton, Spinner, SpinnerSize, Stack, getTheme } from '@fluentui/react';
import { ReactChatContainer } from './ReactChatContainer';
import { AzureOAIGPTStreamService } from '../services/AzureOAIGPTStreamService';
import { EventEmitter2 } from 'eventemitter2';

/**
 * Interface for ReactRoot
 */
export interface IReactRootProps {
  height: number;
  ns: string; // namespace
  userLanguageId: number;
  aoaiGPTStreamService: AzureOAIGPTStreamService;
  receiveNonReactDiv: (nonReactDiv: HTMLDivElement) => void;
  receiveSpinnerDiv: (spinnerDiv: HTMLDivElement) => void;
  emitter: EventEmitter2;
}

/**
 * ReactRoot which works with ConnectionViewer
 */
export const ReactRoot = React.memo<IReactRootProps>(
  /**
   * The React component for ReactRoot
   * @param props Properties to be used
   * @returns The React component
   */
  function ReactRootMemo(props: IReactRootProps) {
    const myNonReactRef = React.useRef(null);
    const mySpinnerRef = React.useRef(null);
    const [isOptionsModalOpen, { setTrue: showOptionsModal, setFalse: hideOptionsModal }] = useBoolean(false);
    const [isChatContainerOpen, { setTrue: showChatContainer, setFalse: hideChatContainer }] = useBoolean(false);

    const toggleShowChatContainer = React.useCallback(() => {
      if (isChatContainerOpen) hideChatContainer();
      else showChatContainer();
    }, [isChatContainerOpen]);

    React.useEffect(() => {
      if (myNonReactRef.current) props.receiveNonReactDiv(myNonReactRef.current);
    }, [myNonReactRef]);

    React.useEffect(() => {
      if (mySpinnerRef.current) props.receiveSpinnerDiv(mySpinnerRef.current);
    }, [mySpinnerRef]);

    React.useEffect(() => {
      if (isOptionsModalOpen) hideChatContainer();
    }, [isOptionsModalOpen]);

    return (
      <div id={props.ns + '_rootDiv'} style={{ width: '100%', height: props.height + 'px' }}>
        <div id={props.ns + '_nonReactDiv'} ref={myNonReactRef} style={{ width: '100%', height: '100%' }} />
        <div id={props.ns + '_reactDiv'} style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
          <Stack enableScopedSelectors horizontal disableShrink tokens={horizontalGapStackTokens}>
            <Stack.Item>
              <IconButton
                styles={iconButtonStyles}
                iconProps={settingsIcon}
                ariaLabel="open modal"
                onClick={showOptionsModal}
              />
            </Stack.Item>
            {props.aoaiGPTStreamService && (
              <Stack.Item>
                <IconButton
                  styles={iconButtonStyles}
                  iconProps={chatIcon}
                  ariaLabel="start chat"
                  onClick={toggleShowChatContainer}
                />
              </Stack.Item>
            )}
          </Stack>
          <div ref={mySpinnerRef} style={{ position: 'absolute', width: '100%', margin: '4px' }} >
            <Spinner size={SpinnerSize.large} />
          </div>
          <ReactConnDescs />
          {props.aoaiGPTStreamService && (
            <ReactChatContainer
              aoaiGPTStreamService={props.aoaiGPTStreamService}
              ns={props.ns}
              parentHeight={props.height}
              isChatContainerOpen={isChatContainerOpen}
              hideChatContainer={hideChatContainer}
              emitter={props.emitter}
            />
          )}
          <ReactOptionsContainer ns={props.ns} userLanguageId={props.userLanguageId} isModalOpen={isOptionsModalOpen} hideModal={hideOptionsModal} />
        </div>
      </div>
    );
  }
);

const settingsIcon: IIconProps = { iconName: 'Settings' };
const chatIcon: IIconProps = { iconName: 'ChatInviteFriend' };
const theme = getTheme();
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    marginTop: '4px',
    marginRight: 'auto',
    display: 'block',
    position: 'absolute',
    pointerEvents: 'all',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 28,
};