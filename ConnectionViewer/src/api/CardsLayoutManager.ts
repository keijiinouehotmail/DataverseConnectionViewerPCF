import { CardsLayout, SingleCardLayout } from "./CardsLayout";
import { ConnectionViewer } from "../ConnectionViewer";
import { DataverseAccessWebAPI } from "../services/DataverseAccessWebAPI";
import { DataverseRecord } from "./DataverseRecord";
import { WebAPIRecord } from "./WebAPIRecord";

/**
* A class that manages to record and read the layout in which the cards are deployed
* One layout is managed by the CardsLayout class, and its data is stored in the Dataverse
* Note (annotation) Stored as the value of the documentbody attribute of the entity record.
*/
export class CardsLayoutManager {
    /**
    * Currently using CardLayout
    */
    CurrentCardsLayout: CardsLayout;
    /**
    * The DataverseRecord that appears at the first and the main that is currently targeted
    */
    PrimaryDataverseRecord: DataverseRecord;
    /**
    * Currently replaying card layouts
    */
    replayingCardsLayout: CardsLayout;
    /**
    * Index of the most recently expanded FocusedIdList among the card layouts currently being replayed.
    */
    replayingFocusedIdIndex = 0;
    /**
    * Generate a CurrentCardsLayout internally.
    */
    constructor(annotationId?: string) {
        this.CurrentCardsLayout = new CardsLayout(annotationId);
    }
    /**
    * Add the ID of the DataverseRecord of the focused and expanded card to the CurrentCardsLayout.
    */
    AddFocusedId(id: string): void {
        this.CurrentCardsLayout.FocusedIdList.push(id);
    }
    /**
    * Search on the current CV.forceGraph to get a SingleCardLayout[] that represents all Cards.
    */
    GetAllCardList(): SingleCardLayout[] {
        const sclList: SingleCardLayout[] = [];
        for (const node of ConnectionViewer.forceGraph.forceList.nodes) {
            const id = node.id.substring(ConnectionViewer.IDPrefix.length);
            sclList.push(new SingleCardLayout(id, node.x, node.y, node.fixed));
        }
        return sclList;
    }
    /**
    * Search on the current CV.forceGraph to get a SingleCardLayout[] representing all FixedCards.
    * Set to CurrentCardsLayout.CardList.
    */
    SetAllCardList(): void {
        this.CurrentCardsLayout.CardList = this.GetAllCardList();
    }
    /**
    * The ID of the last focused card is
    * Set to CurrentCardsLayout.LastFocusedId.
    */
    SetLastFocusedId(id: string): void {
        this.CurrentCardsLayout.LastFocusedId = id;
    }
    /**
    * Receive the amount of movement of the entire canvas and
    * set to CurrentCardsLayout.CanvasTranslated.
    */
    SetCanvasTranslated(_x: number, _y: number): void {
        this.CurrentCardsLayout.CanvasTranslated = { x: _x, y: _y };
    }
    /**
    * Save the current card layout as a new annotation record.
    * @param notetext {string} A description string for the card layout to be saved
    * 
    */
    SaveCurrentCardsLayoutPromise(notetext: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.SetAllCardList();
            const translatedPosition = ConnectionViewer.forceGraph.getCanvasPosition();
            this.SetCanvasTranslated(translatedPosition.x, translatedPosition.y);
            this.CurrentCardsLayout.ConfigId = ConnectionViewer.cv.config.ID;
            this.CurrentCardsLayout.Name = notetext;

            DataverseAccessWebAPI.createAnnotationRecordForCardsLayoutPromise(this.CurrentCardsLayout)
                .then(() => {
                    resolve();
                })
                .catch((e: any) => {
                    reject(e.toString());
                });
        });
    }
    /**
    * Get the card layout (annotation record) stored in the record of the main card and
    * convert to an array of CardsLayout and return it.
    */
    LoadCardsLayoutListPromise(): Promise<CardsLayout[]> {
        return new Promise<CardsLayout[]>((resolve, reject) => {
            DataverseAccessWebAPI.retrieveAnnotationRecordForCardsLayoutPromise(null)
                .then((records: WebAPIRecord[]) => {
                    const cardsLayoutList: CardsLayout[] = [];

                    for (const record of records) {
                        const cardsLayout = CardsLayout.getCardsLayoutFromAnnotationWebAPIRecord(record);
                        if (cardsLayout) cardsLayoutList.push(cardsLayout);
                    }
                    resolve(cardsLayoutList);
                }).catch((e: any) => {
                    reject(e.toString());
                });
        });
    }
    /**
    * annotationId is passed to determine if there is a card layout specification, and if so,
    * Get the card layout data from Dataverse and start a replay of that card layout.
    * Do not modify the argument object.
    * The return value is an object, where record is an argument object with no modifications.
    * existCardLayout holds true if there is a CardLayout to play.
    */
    initCardsLayoutReplayPromise(_record: WebAPIRecord, annotationId?: string): Promise<{ record: WebAPIRecord; existCardLayout: boolean }> {
        return new Promise<{ record: WebAPIRecord; existCardLayout: boolean }>((resolve, reject) => {
            if (annotationId) {
                // Get card layout data from Dataverse
                DataverseAccessWebAPI.retrieveAnnotationRecordForCardsLayoutPromise(annotationId)
                    .then((annotationWebAPIRecords) => {
                        const annotationWebAPIRecord = annotationWebAPIRecords[0] // There shoul be only record.
                        const cardsLayout = CardsLayout.getCardsLayoutFromAnnotationWebAPIRecord(annotationWebAPIRecord);

                        if (cardsLayout) {
                            ConnectionViewer.cv.clm.replayingCardsLayout = cardsLayout;
                            ConnectionViewer.cv.clm.replayingFocusedIdIndex = 0;
                            ConnectionViewer.cv.translateCanvas(cardsLayout.CanvasTranslated.x, cardsLayout.CanvasTranslated.y);
                            ConnectionViewer.cv.showCurrentlyRetrievingStoryboard(true);
                        }
                        resolve({ record: _record, existCardLayout: true });
                    })
                    .catch((e: any) => {
                        ConnectionViewer.cv.showCurrentlyRetrievingStoryboard(false);
                        reject(e.message);
                    });
            } else {
                resolve({ record: _record, existCardLayout: false });
            }

        });
    }
    /**
    * Continue the replay of the card layout.
    */
    nextCardsLayoutReplay(): void {
        // Processing of FocusedIdList
        if (ConnectionViewer.cv.clm.replayingFocusedIdIndex < ConnectionViewer.cv.clm.replayingCardsLayout.FocusedIdList.length - 1) {
            ConnectionViewer.cv.clm.replayingFocusedIdIndex++;

            // Id of the DataverseRecord of the card to be focused next
            let id = ConnectionViewer.cv.clm.replayingCardsLayout.FocusedIdList[ConnectionViewer.cv.clm.replayingFocusedIdIndex];
            let dataverseRecord = ConnectionViewer.cv.findDataverseRecordById(id);
            // There are cases where you have not obtained those with that id for reasons such as access privileges.
            if (dataverseRecord) {
                let cardControl = dataverseRecord.Card;
                cardControl.Focus();
            } else {
                // Here, it should not be this.nextCardsLayoutReplay.
                setTimeout(ConnectionViewer.cv.clm.nextCardsLayoutReplay, 100);
            }
        } else {
            // Focus the last focused card
            let id = ConnectionViewer.cv.clm.replayingCardsLayout.LastFocusedId;
            let dataverseRecord = ConnectionViewer.cv.findDataverseRecordById(id);
            // There are cases where you have not obtained those with that id for reasons such as access privileges.
            if (dataverseRecord) {
                let cardControl = dataverseRecord.Card;
                cardControl.Focus();
            }

            // End card layout replay
            ConnectionViewer.cv.IS_CardsLaout_Replaying = false;
            ConnectionViewer.cv.showCurrentlyRetrievingStoryboard(false);
        }
    }
    /**
     * Returns a SingleCardLayout instance of the CardsLayout being replayed, if any, with the specified ID.
     * If not, returns null.
     */
    findCardInReplaying(id: string): SingleCardLayout | null {
        if (this.replayingCardsLayout) {
            for (let i = 0; i < this.replayingCardsLayout.CardList.length; i++) {
                let cardLayout = this.replayingCardsLayout.CardList[i];
                if (id == cardLayout.DataverseRecordId) {
                    return cardLayout;
                }
            }
        }
        return null;
    }
}
