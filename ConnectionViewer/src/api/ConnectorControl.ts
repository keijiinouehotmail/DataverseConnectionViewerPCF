import { ConnectionViewer } from "../ConnectionViewer";
import { DataverseLink } from "./DataverseLink";

/**
 * Connector controls. A class that contains controls that represent connections or OneToMany associations.
 */
export class ConnectorControl {
    /**
    * @property
    */
    Description: string | null;
    /**
    * @property
    */
    Role1: string | null;
    /**
    * @property
    */
    Role2: string | null;
    /**
     * 
     */
    linkId: string;
    /**
    * @param {string} linkId ICVSimulationLinkDatum.id
    */
    constructor(linkId: string) {
        this.linkId = linkId;
    }
    /**
     * Add the DataverseLink to the appropriate link in forceList.links managed by forceGraph.
     * It is assumed that the existing DataverseLink exists in link.dataverseLinkArray.
     */
    addDataverseLink(dvLink1: DataverseLink, dvLink2: DataverseLink) {
        ConnectionViewer.forceGraph.addDataverseLink(dvLink1, dvLink2);
        this.Description = ConnectionViewer.cv.resStr("multipleDataverseLinksLabel");
        this.Role1 = "";
        this.Role2 = "";
    }
    /**
    * Find a link in forceList.links that has the same linkId as this instance and
    * check whether there is a DataverseLink that can be judged to be a DataverseLink with the same meaning as the given DataverseLink.
    * @return {boolean} true if it exists
    */
    HaveSameContextInDataverseLinkAray(dataverseLink: DataverseLink): boolean {
        const link = ConnectionViewer.forceGraph.forceList.links.find((link) => link.id === this.linkId);
        if (link) return (link.dataverseLinkArray.find((dvLink) => DataverseLink.HaveSameContext(dvLink, dataverseLink))) ? true : false;
        else return false;
    }
}
