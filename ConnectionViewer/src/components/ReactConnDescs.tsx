import * as React from 'react';
import { Callout, DirectionalHint, mergeStyleSets } from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { ConnectionViewer } from '../ConnectionViewer';
import { ImageResources } from '../api/ImageResources';

/**
 * Represents one Link in Dataverse.
 * Used in IConnDescsContext.
 */
export interface IDVLink {
  displayRoleNameLeft: string;
  displayRoleNameRight: string;
  description: string;
}

/**
 * Represents the content to be displayed in the component that displays the description of the connection.
 */
export interface IConnDescsContext {
  // Something to be used as the id of the element, which is "cd_" + link.id.
  elementId: string; 
  recordDisplayNameLeft: string;
  recordDisplayNameRight: string;
  entityDisplayNameLeft: string;
  entityDisplayNameRight: string;
  DVLinkArray: IDVLink[];
}

export const ReactConnDescs = React.memo(
  function ReactConnDescsMemo() {
    const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
    const labelId = useId('callout-label');
    const descriptionId = useId('callout-description');
    const connDescsContext = ConnectionViewer.cv.connDescsContext;
    const targetId = connDescsContext?.elementId ?? "dummyAtThisPoint";
    const ns = ConnectionViewer.ns;
    const line_png = ImageResources.line_png_url;
    const is5Columns = connDescsContext?.DVLinkArray?.some((dvLink: IDVLink) => dvLink.description && dvLink.description.length > 0);
    const multipleLlinksTR = connDescsContext?.DVLinkArray?.map((dvLink: IDVLink, index: number) => {
      if (dvLink.description && dvLink.description.length > 0)
        return <tr key={`tr_${index}`}>
          <td className={styles.multipleLlinksTD} style={{ textAlign: 'left' }}>{dvLink.displayRoleNameLeft}</td>
          <td className={styles.multipleLlinksTD} style={{ width: '50%' }}><div><img className={styles.multipleLlinksLine} src={line_png} /></div></td>
          <td className={styles.multipleLlinksTD} style={{ textAlign: 'center' }}><p className={styles.multipleLlinksDescription}>{dvLink.description}</p></td>
          <td className={styles.multipleLlinksTD} style={{ width: '50%' }}><div><img className={styles.multipleLlinksLine} src={line_png} /></div></td>
          <td className={styles.multipleLlinksTD} style={{ textAlign: 'right' }}>{dvLink.displayRoleNameRight}</td>
        </tr>;
      else return <tr key={`tr_${index}`}>
          <td className={styles.multipleLlinksTD} style={{ textAlign: 'left' }}>{dvLink.displayRoleNameLeft}</td>
          <td className={styles.multipleLlinksTD} style={{ width: '100%' }} colSpan={(is5Columns) ? 3 : 1}><div><img className={styles.multipleLlinksLine} src={line_png} /></div></td>
          <td className={styles.multipleLlinksTD} style={{ textAlign: 'right' }}>{dvLink.displayRoleNameRight}</td>
      </tr>
    });

    ConnectionViewer.cv.toggleIsCalloutVisible = toggleIsCalloutVisible;

    return (
      <>
        {isCalloutVisible && (
          <Callout
            className={styles.callout}
            ariaLabelledBy={labelId}
            ariaDescribedBy={descriptionId}
            role="dialog"
            gapSpace={0}
            target={`#${targetId}`}
            onDismiss={toggleIsCalloutVisible}
            setInitialFocus
            directionalHint={DirectionalHint.bottomCenter}
            calloutMaxHeight={300}
          >
            <div style={{ width: "100%" }}>
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td id={`${ns}_MultipleLlinksRecordDisplayNameLeft`} className={styles.multipleLlinksRecordDisplayName} style={{ textAlign: "left" }}>{connDescsContext.recordDisplayNameLeft}</td>
                    <td id={`${ns}_MultipleLlinksRecordDisplayNameRightt`} className={styles.multipleLlinksRecordDisplayName} style={{ textAlign: "right" }}>{connDescsContext.recordDisplayNameRight}</td>
                  </tr>
                  <tr>
                    <td id={`${ns}_MultipleLlinksEntityDisplayNameLeft`} className={styles.multipleLlinksEntityDisplayName} style={{ textAlign: "left" }}>{connDescsContext.entityDisplayNameLeft}</td>
                    <td id={`${ns}_MultipleLlinksEntityDisplayNameRight`} className={styles.multipleLlinksEntityDisplayName} style={{ textAlign: "right" }}>{connDescsContext.entityDisplayNameRight}</td>
                  </tr>
                  <tr>
                    <td id={`${ns}_MultipleDVLinks`} colSpan={2} style={{ padding: "0px 10px 0px 10px" }}>
                      <table className={styles.multipleLlinksOneLink} style={{ width: "100%" }}>
                        <tbody>
                          {multipleLlinksTR}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Callout>
        )}
      </>
    );
  }
);

const styles = mergeStyleSets({
  callout: {
    width: 400,
    maxWidth: '90%',
    padding: '10px 12px',
  },
  multipleLlinksRecordDisplayName: {
    fontSize: "large",
    width: "200px",
    color: "rgb(0,102,204)",
  },
  multipleLlinksEntityDisplayName: {
    fontSize: "11px",
    width: "200px",
    color: "#888888",
  },
  multipleLlinksTD: {
    fontSize: 'small',
    padding: '8px 0px 0px 0px',
    whiteSpace: 'nowrap',
  },
  multipleLlinksLine: {
    height: "22px",
    width: "100%",
  },
  multipleLlinksDescription: {
    whiteSpace: "normal",
    width: "160px",
    color: "rgb(0,102,204)",
  },
  multipleLlinksOneLink: {
    margin: "0px 0px 0px 0px",
    width: "100%",
  },
});
