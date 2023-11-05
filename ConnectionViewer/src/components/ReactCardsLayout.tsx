import * as React from 'react';
import {
  getTheme,
  mergeStyleSets,
  IButtonStyles,
  CompoundButton,
} from '@fluentui/react';

export interface IReactCardsLayoutProps {
  id: string; // id as HTML element
  layoutId: string; // id of cards layout
  title: string;
  layoutRemarkInfo?: string;
  layoutRemarkWarnning?: string;
  onClick: (layoutId: string) => void;
}

export const ReactCardsLayout: React.FunctionComponent<IReactCardsLayoutProps> = (props: IReactCardsLayoutProps) => {
  const onClick = () => {
    props.onClick(props.layoutId);
  };

  return (
    <CompoundButton title={props.title} styles={iconButtonStyles}
      id={props.id}
      onClick={onClick} draggable={false}
    >
      <table className={contentStyles.layoutListTable}>
        <tbody>
          <tr>
            <td>
              <div className={contentStyles.title}>{props.title}</div>
            </td>
          </tr>
          <tr>
            <td>
              {props.layoutRemarkInfo && <div className={contentStyles.configRemarkInfo}>{props.layoutRemarkInfo}</div>}
              {props.layoutRemarkWarnning && <div className={contentStyles.configRemarkWarning}>{props.layoutRemarkWarnning}</div>}
            </td>
          </tr>
        </tbody>
      </table>
    </CompoundButton>
  );
};

const theme = getTheme();
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: theme.palette.neutralPrimary,
    backgroundColor: theme.palette.themeLighter,
    maxWidth: '',
    maxHeight: '',
    width: '100%',
    margin: '4px',
    padding: '0px',
    textAlign: 'left',
  },
  rootHovered: {
    color: theme.palette.neutralDark,
    backgroundColor: theme.palette.themeLighterAlt,
  },
};

// In the following, the appearance of the button cannot be specified. The button should look like iconButtonStyles
const contentStyles = mergeStyleSets({
  layoutListTable: {
    width: '100%',
  },
  title: {
    justifyContent: 'left',
    fontSize: '1.5em',
    padding: '4px',
  },
  configRemarkInfo: {
    whiteSpace: 'normal',
    fontSize: '0.8em',
    fontWeight: 'lighter',
    color: 'rgb(120,120,120)',
    padding: '0px 4px 4px 4px',
  },
  configRemarkWarning: {
    whiteSpace: 'normal',
    fontSize: '0.8em',
    fontWeight: 'lighter',
    color: 'red',
    padding: '0px 4px 4px 4px',
  },
});
