import * as React from 'react';
import {
  mergeStyleSets,
} from '@fluentui/react';
import { ReactOptionsModal } from './ReactOptionsModal';

export interface IReactOptionsContainerProps {
  ns: string; // namespace
  userLanguageId: number;
  isModalOpen: boolean;
  hideModal: () => void;
}
export const ReactOptionsContainer: React.FunctionComponent<IReactOptionsContainerProps> = (props: IReactOptionsContainerProps) => {
  return (
    <div id={`${props.ns}_ReactOptionsContainerDiv`} className={contentStyles.container} >
      <ReactOptionsModal
        userLanguageId={props.userLanguageId}
        isModalOpen={props.isModalOpen}
        hideModal={props.hideModal}
      />
    </div>
  );
};

const contentStyles = mergeStyleSets({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    fontFamily: 'Meiryo UI',
  }
});
