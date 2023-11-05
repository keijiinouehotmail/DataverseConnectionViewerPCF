import { ConnectionViewer } from "../ConnectionViewer";
import { DataverseRecord } from "./DataverseRecord";
import { ForceGraph_CircleUI, ICVSimulationNodeDatum } from "./ForceGraph_CircleUI";

/**
 * A class that provides the ability to expand a card to a certain distance for a card
 */
export class ForceGraphCardsExpander {
  private cv: ConnectionViewer;
  private forceGraph: ForceGraph_CircleUI;
  private isExpanding: boolean = false;
  private currentMaxDistance: number;
  private currentSourceNode: ICVSimulationNodeDatum | undefined;
  private currentDistance: number;
  // key: distance, value: dataverseRecord array
  private currentTargetRecords: { [key: number]: DataverseRecord[] };
  // This should not have duplicated nodes.
  private nodesToBeCheckedInNextDistance: ICVSimulationNodeDatum[];

  constructor(cv: ConnectionViewer, forceGraph: ForceGraph_CircleUI) {
    this.cv = cv;
    this.forceGraph = forceGraph;
    this.nextExpand = this.nextExpand.bind(this);
  }
  public initiateExpand(sourceNodePrefixedId: string, maxDistance: number): void {
    this.currentSourceNode = this.forceGraph.findNode(sourceNodePrefixedId);
    this.currentMaxDistance = maxDistance;
    this.currentDistance = 0;
    this.currentTargetRecords = {};
    this.nodesToBeCheckedInNextDistance = [];
    if (this.currentSourceNode && this.currentDistance < this.currentMaxDistance) {
      const id = sourceNodePrefixedId.substring(ConnectionViewer.IDPrefix.length);
      const targetRecord = this.cv.DataverseRecordArray.find((record) => record.Id == id);
      if (targetRecord) {
        this.addTargetRecord(this.currentDistance, targetRecord);
        this.isExpanding = true;
        targetRecord.Card.Focus(this.nextExpand, this.currentDistance);
      } else {
        this.expandDone("There is no targetRecord");
      }
    } else {
      this.expandDone("There is no source node or currentDistance is already max distance");
    }
  }
  private nextExpand(recordDone: DataverseRecord, distanceDone: number): void {
    this.removeTargetRecord(recordDone);

    // Manage nodes to be checked in next distance
    if (this.currentDistance + 1 < this.currentMaxDistance) {
      const nextPossibleLinks = this.forceGraph.forceList.links.filter((link) => {
        return link.source.id === ConnectionViewer.IDPrefix + recordDone.Id || link.target.id === ConnectionViewer.IDPrefix + recordDone.Id;
      });
      for (const ndoe of nextPossibleLinks) {
        let targetNode: ICVSimulationNodeDatum;
        if (ndoe.source.id === ConnectionViewer.IDPrefix + recordDone.Id) {
          targetNode = ndoe.target;
        } else {
          targetNode = ndoe.source;
        }
        const id = targetNode.id.substring(ConnectionViewer.IDPrefix.length);
        const dataverseRecord = this.cv.findDataverseRecordById(id);

        if (dataverseRecord) {
          if (this.nodesToBeCheckedInNextDistance.indexOf(targetNode) < 0)
            this.nodesToBeCheckedInNextDistance.push(targetNode);
        }
      }
    }

    // Expand in same distance
    const nextRecord = this.currentTargetRecords[this.currentDistance]?.pop();
    if (nextRecord) {
      nextRecord.Card.Focus(this.nextExpand, this.currentDistance);
    } else {
      // Expand in next distance when all cards in same distance are expanded
      this.currentDistance++;
      if (this.currentDistance < this.currentMaxDistance) {
        if (this.nodesToBeCheckedInNextDistance.length > 0) {
          for (const node of this.nodesToBeCheckedInNextDistance) {
            const id = node.id.substring(ConnectionViewer.IDPrefix.length);
            const targetRecord = this.cv.DataverseRecordArray.find((record) => record.Id == id);
            if (targetRecord) {
              this.addTargetRecord(this.currentDistance, targetRecord);
            }
          }
          this.nodesToBeCheckedInNextDistance = [];
          const nextRecord = this.popTargetRecord();
          if (nextRecord) {
            nextRecord.Card.Focus(this.nextExpand, this.currentDistance);
          } else {
            this.expandDone("There is no next record");
          }
        } else {
          this.expandDone("There is no next node in nodesToBeCheckedInNextDistance");
        }
      } else {
        this.expandDone("Reached to max distance");
      }
    }
  }
  private addTargetRecord(distance: number, record: DataverseRecord): void {
    if (!this.currentTargetRecords) this.currentTargetRecords = {};
    if (!(distance in this.currentTargetRecords)) this.currentTargetRecords[distance] = [];
    this.currentTargetRecords[distance].push(record);
  }
  private removeTargetRecord(record: DataverseRecord): void {
    for (const distance in this.currentTargetRecords) {
      const index = this.currentTargetRecords[distance].indexOf(record);
      if (index >= 0) {
        this.currentTargetRecords[distance].splice(index, 1);
        if (this.currentTargetRecords[distance].length === 0) {
          delete this.currentTargetRecords[distance];
        }
        break;
      }
    }
  }
  private popTargetRecord(): DataverseRecord | undefined {
    return this.currentTargetRecords[this.currentDistance]?.pop();
  }
  private expandDone(debugMessage?: string): void {
    this.isExpanding = false;
  }
}