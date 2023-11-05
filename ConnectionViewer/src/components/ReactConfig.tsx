import * as React from 'react';
import {
  getTheme,
  mergeStyleSets,
  IButtonStyles,
  CompoundButton,
} from '@fluentui/react';

export interface IReactConfigProps {
  id: string; // id as HTML element
  dataCvConfigId: string; // if of config
  title: string;
  configRemark: string;
  configDescription: string;
  onClick: (dataCvConfigId: string) => void;
  disabled: boolean;
}

export const ReactConfig: React.FunctionComponent<IReactConfigProps> = (props: IReactConfigProps) => {
  const onClick = () => {
    props.onClick(props.dataCvConfigId);
  };

  return (
    <CompoundButton title={props.title} styles={iconButtonStyles}
      id={props.id} data-cv-config-id={props.dataCvConfigId}
      onClick={onClick} draggable={false} disabled={props.disabled}
    >
      <table className={contentStyles.cofigListTable}>
        <tbody>
          <tr>
            <td>
              <div className={contentStyles.title}>{props.title}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={contentStyles.configRemark}>{props.configRemark}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={contentStyles.configDescription}>{props.configDescription}</div>
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

// In the following, the appearance of the button cannot be specified. The appearance of the button should be specified using iconButtonStyles.
const contentStyles = mergeStyleSets({
  cofigListTable: {
    width: '100%',
  },
  title: {
    justifyContent: 'left',
    fontSize: '1.5em',
    padding: '4px',
  },
  configRemark: {
    whiteSpace: 'normal',
    fontSize: '1.0em',
    fontWeight: 'lighter',
    color: 'rgb(120,120,120)',
    padding: '4px',
  },
  configDescription: {
    whiteSpace: 'normal',
    fontSize: '1.0em',
    fontWeight: 'lighter',
    margin: '0px 0px 0px 10px',
    padding: '4px',
  },
});
