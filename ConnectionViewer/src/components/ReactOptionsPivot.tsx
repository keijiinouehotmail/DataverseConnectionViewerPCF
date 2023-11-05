import * as React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { ReactConfigContainer } from './ReactConfigContainer';
import { ReactCardsLayoutContainer } from './ReactCardsLayoutContainer';
import { ConnectionViewer } from '../ConnectionViewer';
import { ReactResetContainer } from './ReactResetContainer';

export interface IReactOptionsPivotProps {
  userLanguageId: number;
  hideModal: () => void;
}

export const ReactOptionsPivot: React.FunctionComponent<IReactOptionsPivotProps> = (props: IReactOptionsPivotProps) => {
  return (
    <Pivot aria-label="Pivot" style={{ textAlign: 'left' }} >
      <PivotItem
        key='0'
        headerText={ConnectionViewer.cv.resStr('Configs')}
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'Config',
        }}
      >
        <ReactConfigContainer userLanguageId={props.userLanguageId} hideModal={props.hideModal} />
      </PivotItem>
      <PivotItem
        key='1'
        headerText={ConnectionViewer.cv.resStr('CardsLayouts')}
        headerButtonProps={{
          'data-order': 2,
          'data-title': 'CardsLayout',
        }}
      >
        <ReactCardsLayoutContainer hideModal={props.hideModal} />
      </PivotItem>
      <PivotItem
        key='2'
        headerText={ConnectionViewer.cv.resStr('Reset')}
        headerButtonProps={{
          'data-order': 3,
          'data-title': 'Reset',
        }}
        >
          <ReactResetContainer hideModal={props.hideModal} />
      </PivotItem>
    </Pivot>
  );
};
