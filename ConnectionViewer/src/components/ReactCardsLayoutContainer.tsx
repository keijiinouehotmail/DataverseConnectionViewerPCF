import * as React from 'react';
import { DefaultButton, IButtonStyles, IStackTokens, Spinner, SpinnerSize, Stack, TextField, getTheme, mergeStyleSets } from '@fluentui/react';
import { ConnectionViewer } from '../ConnectionViewer';
import { Helper } from '../api/Helper';
import { CardsLayout } from '../api/CardsLayout';
import { ReactCardsLayout } from './ReactCardsLayout';

export interface IReactCardsLayoutContainerProps {
  hideModal: () => void;
}

export const ReactCardsLayoutContainer: React.FunctionComponent<IReactCardsLayoutContainerProps> = (props: IReactCardsLayoutContainerProps) => {
  const [saveTextDisabled, setSaveTextDisabled] = React.useState(true);
  const [saveText, setSaveText] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [layoutLiList, setLayoutLiList] = React.useState<JSX.Element[]>([]);
  const [retrieved, setRetrieved] = React.useState(false);
  const currentConfig = ConnectionViewer.cv.config;

  const onSaveTextChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
      if (newValue && newValue.length > 0) { setSaveText(newValue); setSaveTextDisabled(false); }
      else { setSaveText(''); setSaveTextDisabled(true); }
    },
    [],
  );
  const onSaveTextClicked = React.useCallback(
    () => {
      setSaving(true);
      ConnectionViewer.cv.clm.SaveCurrentCardsLayoutPromise(saveText)
        .then(() => {
          Helper.addMessageln(ConnectionViewer.cv.resStr('ExpandedCardsLayoutWereSaved'));
          setSaving(false);
          props.hideModal();
        })
        .catch((e: any) => {
          Helper.addErrorMessageln(e.toString() + " in ReactCardsLayoutContainer");
          setSaving(false);
        });
    },
    [saveText],);

  React.useEffect(() => {
    ConnectionViewer.cv.clm.LoadCardsLayoutListPromise()
      .then((list: CardsLayout[]) => {
        const _layoutLiList = list.map((layout: CardsLayout, index: number) =>
          <li className={contentStyles.li} key={`li-${index}`}>
            <ReactCardsLayout
              id={`layout-${index}`}
              layoutId={layout.annotationId}
              title={layout.Name}
              layoutRemarkInfo={(layout.ConfigId === currentConfig.ID) ?
                `${ConnectionViewer.cv.resStr('ConfigWhenSaved')} "${layout.ConfigId}" ${ConnectionViewer.cv.resStr('matchedLabel')}`
                : undefined}
              layoutRemarkWarnning={(layout.ConfigId === currentConfig.ID) ?
                undefined
                : `${ConnectionViewer.cv.resStr('ConfigWhenSaved')} "${layout.ConfigId}" ${ConnectionViewer.cv.resStr('isNotMatchedWithCurrentConfigMiddle')} "${currentConfig.ID}" ${ConnectionViewer.cv.resStr('isNotMatchedWithCurrentConfigLast')}`}
              onClick={() => layoutClicked(layout.annotationId)}
            />
          </li>
        );
        setLayoutLiList([..._layoutLiList]);
        setRetrieved(true);
      })
      .catch((e: any) => {
        Helper.addErrorMessageln(e.toString() + " in ReactCardsLayoutContainer");
      });
  }, []);

  const layoutClicked = (annotationId: string) => {
    setTimeout(() => ConnectionViewer.cv.resetConnectionViewer(annotationId), 200); // Reload after a short pause. While it feels good.
    props.hideModal();
  };

  return (
    <div className={contentStyles.body}>
      {ConnectionViewer.cv.resStr('ExpandedCardsLayoutCanBeSavedOrApplied')}
      <Stack verticalAlign="start" className={contentStyles.stack}>
        <Stack.Item className={contentStyles.categoryItem}>
          {ConnectionViewer.cv.resStr('SaveCurrentExpandedCardsLayout')}
          {(ConnectionViewer.cv.IS_DEMO_MODE) ? (
            <Stack horizontal tokens={horizontalGapStackTokens}>
              <Stack.Item align="auto" className={contentStyles.stackItemTertiary}>
                {ConnectionViewer.cv.resStr('ThisFunctionIsNotAvailableInSampleDemoMode')}
              </Stack.Item>
            </Stack>
          ) : (
            <Stack horizontal tokens={horizontalGapStackTokens}>
              <Stack.Item align="auto" className={contentStyles.stackItem}>
                <TextField
                  placeholder={ConnectionViewer.cv.resStr('PleaseInputCardsLayoutDescription')}
                  className={contentStyles.textField}
                  onChange={onSaveTextChange}
                  value={saveText} />
              </Stack.Item>
              <Stack.Item align="center" className={contentStyles.stackItem}>
                <DefaultButton
                  text={ConnectionViewer.cv.resStr('SaveAndClose')}
                  disabled={saveTextDisabled || saving}
                  onClick={onSaveTextClicked}
                  styles={iconButtonStyles}
                />
              </Stack.Item>
              <Stack.Item align="center" className={contentStyles.stackItem}>
                {(saving) && (
                  <div style={{ display: 'inline-block' }}>
                    <Spinner size={SpinnerSize.medium} />
                  </div>
                )}
              </Stack.Item>
            </Stack>
          )}
        </Stack.Item>
        <Stack.Item className={contentStyles.categoryItem}>
          {ConnectionViewer.cv.resStr('ApplySavedExpandedCardsLayout')}
          <Stack verticalAlign='start'>
            {(!retrieved) ? (
              <Stack.Item className={contentStyles.stackItem}>
                <div style={{ display: 'inline-block' }}>
                  <Spinner size={SpinnerSize.medium} />
                </div>
              </Stack.Item>
            ) : (
              <Stack.Item>
                {(layoutLiList.length !== 0) ?
                  <ul className={contentStyles.layoutContainer}>{layoutLiList}</ul> :
                  <div className={contentStyles.layoutContainer}>
                    {ConnectionViewer.cv.resStr('NoSavedCardsLayoutForThisRecord')}
                  </div>
                }
              </Stack.Item>
            )}
          </Stack>
        </Stack.Item>
      </Stack>
    </div>
  );
};

const theme = getTheme();
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    backgroundColor: theme.palette.themeLighter,
    maxWidth: '',
    minHeight: '',
    width: '100%',
    padding: '10px',
    textAlign: 'left',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
    backgroundColor: theme.palette.themeLighterAlt,
  },
};

const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};

const contentStyles = mergeStyleSets({
  body: {
    margin: '10px',
    fontSize: '1.0em',
    textAlign: 'left',
  },
  stack: {
    margin: '4px',
  },
  categoryItem: {
    margin: '4px 0px',
    padding: '6px',
    border: '1px solid #ccc',
  },
  textField: {
    minWidth: '300px',
  },
  stackItem: {
    padding: '10px',
  },
  stackItemTertiary: {
    padding: '10px',
    color: theme.palette.neutralTertiary,
  },
  layoutContainer: {
    margin: 0,
    padding: '10px',
    listStyleType: 'none',
  },
  li: {
    display: 'block',
    position: 'relative',
    overflow: 'visible',
  },
});