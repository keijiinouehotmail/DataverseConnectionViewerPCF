import * as React from 'react';
import { mergeStyleSets } from '@fluentui/react';
import { ReactConfig } from './ReactConfig';
import { ConnectionViewer } from '../ConnectionViewer';
import { Config } from '../api/Config';
import { Options } from '../api/Options';

export interface IReactConfigContainerProps {
  userLanguageId: number;
  hideModal: () => void;
}

export const ReactConfigContainer: React.FunctionComponent<IReactConfigContainerProps> = (props: IReactConfigContainerProps) => {
  const configSet = ConnectionViewer?.cv?.configSet;
  if (!configSet) return <div />;

  const onClick = (dataCvConfigId: string) => {
    const userOptions = Options.getUserOptions();
    const currentUserOptionsConfigID = userOptions ? userOptions.ConfigID : 'config0';
    if (dataCvConfigId !== currentUserOptionsConfigID) {
      // If different, set user options (save to browser)
      Options.setUserOptions(new Options(dataCvConfigId));

      setTimeout(() => ConnectionViewer.cv.resetConnectionViewer(), 200); // Reload after a short pause. While it feels good.
    }

    props.hideModal();
  };

  // The config that is currently considered the default as a system
  const currentDefaultConfig = Config.getCurrentDefaultConfig(props.userLanguageId, configSet);
  const currentConfig = ConnectionViewer.cv.config;

  const configList = [];

  // Display the choices from the contents of ConfigSet
  for (let i = 0; i < configSet.ConfigArray.length; i++) {
    const id = 'config' + (i + 1).toString(); // id as HTML element
    const config = configSet.ConfigArray[i];
    const dataCvConfigId = config.ID; // id of config
    const title = dataCvConfigId;
    const isCurrentSelection: boolean = (currentConfig.ID === dataCvConfigId) ? true : false;
    // Processing of configRemark
    let configRemark = isCurrentSelection ? `[ ${ConnectionViewer.cv.resStr('CurrentSelection')} ]` : '';
    if (config.ID === currentDefaultConfig.ID) {
      // Default
      configRemark += `[ ${ConnectionViewer.cv.resStr('Default')} ]`;
    }
    const configDescription = config.Description;
    const configItem =
      <ReactConfig
        id={id}
        dataCvConfigId={dataCvConfigId}
        title={title}
        configRemark={configRemark}
        configDescription={configDescription}
        onClick={onClick}
        disabled={isCurrentSelection}
      />;
    configList.push(configItem);
  }

  const configItems = configList.map((config: JSX.Element, index: number) => <li className={contentStyles.li} key={`li-${index}`}>{config}</li>);

  return (
    <div className={contentStyles.body}>
      {ConnectionViewer.cv.resStr('SelectConfig')}
      {configItems && (
        <ul className={contentStyles.configContainer}>{configItems}</ul>
      )}
    </div>
  );
};

const contentStyles = mergeStyleSets({
  body: {
    margin: '10px',
    fontSize: '1.0em',
    textAlign: 'left',
  },
  configContainer: {
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