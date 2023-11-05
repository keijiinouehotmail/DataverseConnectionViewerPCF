import chroma = require("chroma-js");
import { ConnectionViewer } from "../ConnectionViewer";

export const SVG_NS = "http://www.w3.org/2000/svg";
export const XLINK_NS = "http://www.w3.org/1999/xlink";

/**
 * Class for non-React DOM elements
 */
export class NonReactDiv {
  static appendChildren(nonReactDiv: HTMLDivElement): void {
    const nsPrefix = ConnectionViewer.ns;
    if (nsPrefix != 'CV') throw new Error('Error in getWholeDiv() of HTMLFrames.tsx: The namespace should be "CV" in current release');

    const MyPage = document.createElement('div');
    MyPage.id = `${nsPrefix}_MyPage`;
    MyPage.className = `forDrag`;
    nonReactDiv.appendChild(MyPage);

    // The area for dragging the canvas, the same size as the area draw cards and connections
    const MyCanvasToDrag = document.createElement('div');
    MyCanvasToDrag.id = `${nsPrefix}_MyCanvasToDrag`;
    MyPage.appendChild(MyCanvasToDrag);

    // The area for drawing cards and connections
    const MyCardConnectionDiv = document.createElement('div');
    MyCardConnectionDiv.id = `${nsPrefix}_MyCardConnectionDiv`;
    MyPage.appendChild(MyCardConnectionDiv);

    // The area for drawing lines of cards and connections
    // <svg id="CV_MySVG" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" >
    const MySVG = document.createElementNS(SVG_NS, 'svg');
    MySVG.id = `${nsPrefix}_MySVG`;
    MySVG.setAttribute('xmlns:xlink', XLINK_NS);
    MySVG.setAttribute('pointer-events', 'none');
    MyCardConnectionDiv.appendChild(MySVG);

    const defs = document.createElementNS(SVG_NS, 'defs');
    MySVG.appendChild(defs);

    const MyDefCircleL = document.createElementNS(SVG_NS, 'circle');
    MyDefCircleL.id = `${nsPrefix}_MyDefCircleL`;
    MyDefCircleL.setAttribute('cx', '0');
    MyDefCircleL.setAttribute('cy', '0');
    MyDefCircleL.setAttribute('r', '50');
    MyDefCircleL.setAttribute('stroke-width', '6');
    MyDefCircleL.setAttribute('cursor', 'move');
    defs.appendChild(MyDefCircleL);

    const MyDefCircleM = document.createElementNS(SVG_NS, 'circle');
    MyDefCircleM.id = `${nsPrefix}_MyDefCircleM`;
    MyDefCircleM.setAttribute('cx', '0');
    MyDefCircleM.setAttribute('cy', '0');
    MyDefCircleM.setAttribute('r', '34');
    MyDefCircleM.setAttribute('stroke-width', '5');
    MyDefCircleM.setAttribute('cursor', 'move');
    defs.appendChild(MyDefCircleM);

    const MyDefCircleLtoM = document.createElementNS(SVG_NS, 'circle');
    MyDefCircleLtoM.id = `${nsPrefix}_MyDefCircleLtoM`;
    MyDefCircleLtoM.setAttribute('cx', '0');
    MyDefCircleLtoM.setAttribute('cy', '0');
    MyDefCircleLtoM.setAttribute('r', '50');
    MyDefCircleLtoM.setAttribute('stroke-width', '6');
    MyDefCircleLtoM.setAttribute('cursor', 'move');
    defs.appendChild(MyDefCircleLtoM);

    const MyDefCircleMtoL = document.createElementNS(SVG_NS, 'circle');
    MyDefCircleMtoL.id = `${nsPrefix}_MyDefCircleMtoL`;
    MyDefCircleMtoL.setAttribute('cx', '0');
    MyDefCircleMtoL.setAttribute('cy', '0');
    MyDefCircleMtoL.setAttribute('r', '34');
    MyDefCircleMtoL.setAttribute('stroke-width', '5');
    MyDefCircleMtoL.setAttribute('cursor', 'move');
    defs.appendChild(MyDefCircleMtoL);

    // For 2-line display of L size
    const MyDefTextPathL2 = document.createElementNS(SVG_NS, 'path');
    MyDefTextPathL2.id = `${nsPrefix}_MyDefTextPathL2`;
    MyDefTextPathL2.setAttribute('d', 'M -45 0 h 90 M -40 12 h 80 M -34 24 h 68');
    defs.appendChild(MyDefTextPathL2);

    // For 3-line display of L size. The same as 2-line display of L size
    const MyDefTextPathL3 = document.createElementNS(SVG_NS, 'path');
    MyDefTextPathL3.id = `${nsPrefix}_MyDefTextPathL3`;
    MyDefTextPathL3.setAttribute('d', 'M -45 0 h 90 M -40 12 h 80 M -34 24 h 68');
    defs.appendChild(MyDefTextPathL3);

    // For 2-line display of M size
    const MyDefTextPathM2 = document.createElementNS(SVG_NS, 'path');
    MyDefTextPathM2.id = `${nsPrefix}_MyDefTextPathM2`;
    MyDefTextPathM2.setAttribute('d', 'M -24 -3 h 48 M -24 9 h 48');
    defs.appendChild(MyDefTextPathM2);

    // For 3-line display of M size
    const MyDefTextPathM3 = document.createElementNS(SVG_NS, 'path');
    MyDefTextPathM3.id = `${nsPrefix}_MyDefTextPathM3`;
    MyDefTextPathM3.setAttribute('d', 'M -24 -12 h 48 M -29 0 h 58 M -24 12 h 48');
    defs.appendChild(MyDefTextPathM3);

    const MyDefDropShadow = document.createElementNS(SVG_NS, 'filter');
    MyDefDropShadow.id = `${nsPrefix}_MyDefDropShadow`;
    MyDefDropShadow.setAttribute('width', '150%');
    MyDefDropShadow.setAttribute('height', '150%');
    defs.appendChild(MyDefDropShadow);

    const MyDefDropShadowFeGaussianBlur = document.createElementNS(SVG_NS, 'feGaussianBlur');
    MyDefDropShadowFeGaussianBlur.setAttribute('in', 'SourceAlpha');
    MyDefDropShadowFeGaussianBlur.setAttribute('stdDeviation', '4');
    MyDefDropShadow.appendChild(MyDefDropShadowFeGaussianBlur);

    const MyDefDropShadowFeOffset = document.createElementNS(SVG_NS, 'feOffset');
    MyDefDropShadowFeOffset.setAttribute('dx', '3');
    MyDefDropShadowFeOffset.setAttribute('dy', '3');
    MyDefDropShadowFeOffset.setAttribute('result', 'offsetblur');
    MyDefDropShadow.appendChild(MyDefDropShadowFeOffset);

    const MyDefDropShadowFeComposite = document.createElementNS(SVG_NS, 'feComposite');
    MyDefDropShadowFeComposite.setAttribute('in2', 'offsetblur');
    MyDefDropShadowFeComposite.setAttribute('operator', 'in');
    MyDefDropShadow.appendChild(MyDefDropShadowFeComposite);

    const MyDefDropShadowFeMerge = document.createElementNS(SVG_NS, 'feMerge');
    MyDefDropShadow.appendChild(MyDefDropShadowFeMerge);

    const MyDefDropShadowFeMergeNode1 = document.createElementNS(SVG_NS, 'feMergeNode');
    MyDefDropShadowFeMerge.appendChild(MyDefDropShadowFeMergeNode1);

    const MyDefDropShadowFeMergeNode2 = document.createElementNS(SVG_NS, 'feMergeNode');
    MyDefDropShadowFeMergeNode2.setAttribute('in', 'SourceGraphic');
    MyDefDropShadowFeMerge.appendChild(MyDefDropShadowFeMergeNode2);

    const linearGradientForUnfocused = document.createElementNS(SVG_NS, 'linearGradient');
    linearGradientForUnfocused.id = `${nsPrefix}_LGUnfocused`;
    linearGradientForUnfocused.setAttribute('gradientTransform', 'rotate(45)');

    const linearGradientForUnfocused_Stop0 = document.createElementNS(SVG_NS, 'stop');
    linearGradientForUnfocused_Stop0.setAttribute('offset', '0%');
    linearGradientForUnfocused_Stop0.setAttribute('stop-color', 'rgb(166,166,166)');
    linearGradientForUnfocused.appendChild(linearGradientForUnfocused_Stop0);

    const linearGradientForUnfocused_Stop100 = document.createElementNS(SVG_NS, 'stop');
    linearGradientForUnfocused_Stop100.setAttribute('offset', '100%');
    linearGradientForUnfocused_Stop100.setAttribute('stop-color', chroma('rgb(166,166,166)').darken().hex());
    linearGradientForUnfocused.appendChild(linearGradientForUnfocused_Stop100);
    defs.appendChild(linearGradientForUnfocused);

    const ScoringDistanceRect = document.createElementNS(SVG_NS, 'rect');
    ScoringDistanceRect.id = `${nsPrefix}_ScoringDistanceRect`;
    ScoringDistanceRect.setAttribute('x', '-30');
    ScoringDistanceRect.setAttribute('y', '18');
    ScoringDistanceRect.setAttribute('width', '20');
    ScoringDistanceRect.setAttribute('height', '15');
    ScoringDistanceRect.setAttribute('fill', 'yellow');
    ScoringDistanceRect.setAttribute('fill-opacity', '0.9');
    defs.appendChild(ScoringDistanceRect);

    const ScoringScoreRect = document.createElementNS(SVG_NS, 'rect');
    ScoringScoreRect.id = `${nsPrefix}_ScoringScoreRect`;
    ScoringScoreRect.setAttribute('x', '-5');
    ScoringScoreRect.setAttribute('y', '18');
    ScoringScoreRect.setAttribute('width', '40');
    ScoringScoreRect.setAttribute('height', '15');
    ScoringScoreRect.setAttribute('fill', 'cyan');
    ScoringScoreRect.setAttribute('fill-opacity', '0.9');
    defs.appendChild(ScoringScoreRect);

    const ScoringLinkRect = document.createElementNS(SVG_NS, 'rect');
    ScoringLinkRect.id = `${nsPrefix}_ScoringLinkRect`;
    ScoringLinkRect.setAttribute('x', '-10');
    ScoringLinkRect.setAttribute('y', '-8');
    ScoringLinkRect.setAttribute('width', '20');
    ScoringLinkRect.setAttribute('height', '15');
    ScoringLinkRect.setAttribute('fill', 'red');
    ScoringLinkRect.setAttribute('fill-opacity', '0.9');
    defs.appendChild(ScoringLinkRect);

    // The area for detecting mouse operations to drag and drop the entire canvas
    const MyDragDropRect = document.createElementNS(SVG_NS, 'rect');
    MyDragDropRect.id = `${nsPrefix}_MyDragDropRect`;
    MyDragDropRect.setAttribute('x', '0');
    MyDragDropRect.setAttribute('y', '0');
    MyDragDropRect.setAttribute('fill', '#FFFFFF');
    MySVG.appendChild(MyDragDropRect);

    // The area for actually moving the entire canvas
    const MyDragDropG = document.createElementNS(SVG_NS, 'g');
    MyDragDropG.id = `${nsPrefix}_MyDragDropG`;
    MySVG.appendChild(MyDragDropG);

    // The area for drawing lines of connections
    const MySVGLines = document.createElementNS(SVG_NS, 'g');
    MySVGLines.id = `${nsPrefix}_MySVGLines`;
    MyDragDropG.appendChild(MySVGLines);

    // The area for drawing roles of connections
    const MySVGConnectionRoles = document.createElementNS(SVG_NS, 'g');
    MySVGConnectionRoles.id = `${nsPrefix}_MySVGConnectionRoles`;
    MyDragDropG.appendChild(MySVGConnectionRoles);

    // The area for drawing descriptions of connections
    const MySVGConnectionDescriptions = document.createElementNS(SVG_NS, 'g');
    MySVGConnectionDescriptions.id = `${nsPrefix}_MySVGConnectionDescriptions`;
    MyDragDropG.appendChild(MySVGConnectionDescriptions);

    if (ConnectionViewer.cv.paramEnableNodeScoring) {
      // The area for displaying distance on links in node scoring
      const SVGScoringLinksG = document.createElementNS(SVG_NS, 'g');
      SVGScoringLinksG.id = `${nsPrefix}_SVGScoringLinksG`;
      MyDragDropG.appendChild(SVGScoringLinksG);

      /**
       * Graphics of score source nodes in node scoring
       * There are 8 types in total: 2 types for L and M, with/without Attention, and LtoM/MtoL.
       */
      // 1.
      const MyDefCircleScoringSourceL = document.createElementNS(SVG_NS, 'circle');
      MyDefCircleScoringSourceL.id = `${nsPrefix}_MyDefCircleScoringSourceL`;
      MyDefCircleScoringSourceL.setAttribute('cx', '0');
      MyDefCircleScoringSourceL.setAttribute('cy', '0');
      // 58 = ForceGraph_CircleUI.radius_for_role_l + 8, but the variable is not set at this timing.
      MyDefCircleScoringSourceL.setAttribute('r', '58');
      MyDefCircleScoringSourceL.setAttribute('stroke-width', '4');
      MyDefCircleScoringSourceL.setAttribute('fill', 'none');
      defs.appendChild(MyDefCircleScoringSourceL);
      // 2.
      const MyDefCircleScoringSourceLAttention = document.createElementNS(SVG_NS, 'circle');
      MyDefCircleScoringSourceLAttention.id = `${nsPrefix}_MyDefCircleScoringSourceLAttention`;
      MyDefCircleScoringSourceLAttention.setAttribute('cx', '0');
      MyDefCircleScoringSourceLAttention.setAttribute('cy', '0');
      // 58 = ForceGraph_CircleUI.radius_for_role_l + 8, but the variable is not set at this timing.
      MyDefCircleScoringSourceLAttention.setAttribute('r', '58');
      MyDefCircleScoringSourceLAttention.setAttribute('stroke-width', '4');
      MyDefCircleScoringSourceLAttention.setAttribute('fill', 'none');
      const animateForVisibility = document.createElementNS(SVG_NS, 'animate');
      animateForVisibility.setAttribute('attributeName', 'visibility');
      animateForVisibility.setAttribute('values', 'visible;visible;visible;hidden');
      animateForVisibility.setAttribute('dur', '1.5s');
      animateForVisibility.setAttribute('repeatCount', 'indefinite');
      MyDefCircleScoringSourceLAttention.appendChild(animateForVisibility);
      defs.appendChild(MyDefCircleScoringSourceLAttention);
      // 3.
      const MyDefCircleScoringSourceM = document.createElementNS(SVG_NS, 'circle');
      MyDefCircleScoringSourceM.id = `${nsPrefix}_MyDefCircleScoringSourceM`;
      MyDefCircleScoringSourceM.setAttribute('cx', '0');
      MyDefCircleScoringSourceM.setAttribute('cy', '0');
      // 42 = ForceGraph_CircleUI.radius_for_role_m + 8, but the variable is not set at this timing.
      MyDefCircleScoringSourceM.setAttribute('r', '42');
      MyDefCircleScoringSourceM.setAttribute('stroke-width', '4');
      MyDefCircleScoringSourceM.setAttribute('fill', 'none');
      defs.appendChild(MyDefCircleScoringSourceM);
      // 4.
      const MyDefCircleScoringSourceMAttention = document.createElementNS(SVG_NS, 'circle');
      MyDefCircleScoringSourceMAttention.id = `${nsPrefix}_MyDefCircleScoringSourceMAttention`;
      MyDefCircleScoringSourceMAttention.setAttribute('cx', '0');
      MyDefCircleScoringSourceMAttention.setAttribute('cy', '0');
      // 42 = ForceGraph_CircleUI.radius_for_role_m + 8, but the variable is not set at this timing.
      MyDefCircleScoringSourceMAttention.setAttribute('r', '42');
      MyDefCircleScoringSourceMAttention.setAttribute('stroke-width', '4');
      MyDefCircleScoringSourceMAttention.setAttribute('fill', 'none');
      MyDefCircleScoringSourceMAttention.appendChild(animateForVisibility.cloneNode(false));
      defs.appendChild(MyDefCircleScoringSourceMAttention);
      // 5.
      const MyDefCircleScoringSourceLtoM = document.createElementNS(SVG_NS, 'circle');
      MyDefCircleScoringSourceLtoM.id = `${nsPrefix}_MyDefCircleScoringSourceLtoM`;
      MyDefCircleScoringSourceLtoM.setAttribute('cx', '0');
      MyDefCircleScoringSourceLtoM.setAttribute('cy', '0');
      // 42 = ForceGraph_CircleUI.radius_for_role_m + 8, but the variable is not set at this timing.
      MyDefCircleScoringSourceLtoM.setAttribute('r', '42'); 
      MyDefCircleScoringSourceLtoM.setAttribute('stroke-width', '4');
      MyDefCircleScoringSourceLtoM.setAttribute('fill', 'none');
      defs.appendChild(MyDefCircleScoringSourceLtoM);
      // 6.
      const MyDefCircleScoringSourceLtoMAttention = document.createElementNS(SVG_NS, 'circle');
      MyDefCircleScoringSourceLtoMAttention.id = `${nsPrefix}_MyDefCircleScoringSourceLtoMAttention`;
      MyDefCircleScoringSourceLtoMAttention.setAttribute('cx', '0');
      MyDefCircleScoringSourceLtoMAttention.setAttribute('cy', '0');
      // 42 = ForceGraph_CircleUI.radius_for_role_m + 8, but the variable is not set at this timing.
      MyDefCircleScoringSourceLtoMAttention.setAttribute('r', '42'); 
      MyDefCircleScoringSourceLtoMAttention.setAttribute('stroke-width', '4');
      MyDefCircleScoringSourceLtoMAttention.setAttribute('fill', 'none');
      MyDefCircleScoringSourceLtoMAttention.appendChild(animateForVisibility.cloneNode(false));
      defs.appendChild(MyDefCircleScoringSourceLtoMAttention);
      // 7.
      const MyDefCircleScoringSourceMtoL = document.createElementNS(SVG_NS, 'circle');
      MyDefCircleScoringSourceMtoL.id = `${nsPrefix}_MyDefCircleScoringSourceMtoL`;
      MyDefCircleScoringSourceMtoL.setAttribute('cx', '0');
      MyDefCircleScoringSourceMtoL.setAttribute('cy', '0');
      // 58 = ForceGraph_CircleUI.radius_for_role_l + 8, but the variable is not set at this timing.
      MyDefCircleScoringSourceMtoL.setAttribute('r', '58'); 
      MyDefCircleScoringSourceMtoL.setAttribute('stroke-width', '4');
      MyDefCircleScoringSourceMtoL.setAttribute('fill', 'none');
      defs.appendChild(MyDefCircleScoringSourceMtoL);
      // 8.
      const MyDefCircleScoringSourceMtoLAttention = document.createElementNS(SVG_NS, 'circle');
      MyDefCircleScoringSourceMtoLAttention.id = `${nsPrefix}_MyDefCircleScoringSourceMtoLAttention`;
      MyDefCircleScoringSourceMtoLAttention.setAttribute('cx', '0');
      MyDefCircleScoringSourceMtoLAttention.setAttribute('cy', '0');
      // 58 = ForceGraph_CircleUI.radius_for_role_l + 8, but the variable is not set at this timing.
      MyDefCircleScoringSourceMtoLAttention.setAttribute('r', '58'); 
      MyDefCircleScoringSourceMtoLAttention.setAttribute('stroke-width', '4');
      MyDefCircleScoringSourceMtoLAttention.setAttribute('fill', 'none');
      MyDefCircleScoringSourceMtoLAttention.appendChild(animateForVisibility.cloneNode(false));
      defs.appendChild(MyDefCircleScoringSourceMtoLAttention);
    }

    // The area for drawing cards for CircleUI
    const MySVGCards = document.createElementNS(SVG_NS, 'g');
    MySVGCards.id = `${nsPrefix}_MySVGCards`;
    MyDragDropG.appendChild(MySVGCards);

    // The area for displaying messages
    const MessageDiv = document.createElement('div');
    MessageDiv.id = `${nsPrefix}_MessageDiv`;
    MyPage.appendChild(MessageDiv);

    // The area for displaying legends
    const MyLegendDiv = document.createElement('div');
    MyLegendDiv.id = `${nsPrefix}_LegendDiv`;
    MyPage.appendChild(MyLegendDiv);

    const MyLegendTable = document.createElement('table');
    MyLegendTable.id = `${nsPrefix}_LegendTable`;
    MyLegendDiv.appendChild(MyLegendTable);
  }
  /**
   * Receives the entity logical name and its color, and adds an element to <defs> for use in gradient processing, etc.
   * The naming convention for id is CV_LG_ entity logical name. Example: CV_LG_account
   */
  static setEntityColorToSVGDefs(entityLogicalName: string, color: string): void {
    const prefix = ConnectionViewer.ns;
    if (prefix != 'CV') throw new Error('Error in getWholeDiv() of HTMLFrames.tsx: The namespace should be "CV" in current release');
    const linearGradient = document.createElementNS(SVG_NS, 'linearGradient');
    linearGradient.id = `${prefix}_LG_${entityLogicalName}`;
    linearGradient.setAttribute('gradientTransform', 'rotate(45)');

    const stop0 = document.createElementNS(SVG_NS, 'stop');
    stop0.id = `${prefix}_LG_${entityLogicalName}_stop0`;
    stop0.setAttribute('offset', '0%');
    stop0.setAttribute('stop-color', color);
    linearGradient.appendChild(stop0);

    const stop100 = document.createElementNS(SVG_NS, 'stop');
    stop100.id = `${prefix}_LG_${entityLogicalName}_stop100`;
    stop100.setAttribute('offset', '100%');
    stop100.setAttribute('stop-color', chroma(color).darken().hex());
    linearGradient.appendChild(stop100);

    const defs = document.getElementById(`${prefix}_MySVG`)?.querySelector('defs') as SVGDefsElement;
    defs.appendChild(linearGradient);
  }
}
