# Node Scoring

## Scoring Overview

- In this feature, the data represented by the card is called a node.  
- The impact of a particular node on many other nodes is called a score. Here refering to the particular node as "source node" and many other nodes as "target nodes".  
- The farther the target node, the lower the impact.  
- A node affects other target nodes that are adjacent but not close to the source node.
- If there are multiple relationships between a node and a node, the impact is high.  
- Even for the same node, the degree of influence depends on how many target nodes are expanded on the PCF control.  

## UI of Node Scoring

- The graphics of the outer perimeter of the card of the source node are as follows.
  - ![NodeScoringSourceNode](../Images/NodeScoringSourceNode.en.png)
  - Note that when the graphics of the outer perimeter are flashing, it indicates that the score may have changed due to the addition of nodes after the score is calculated.
- Depending on how high or low the score of the target node is, the width of the graphics around the perimeter of the card will change.  
  - High score
    - ![NodeScoringScoreHigh](../Images/NodeScoringScoreHigh.en.png)
  - Low score
    - ![NodeScoringScoreLow](../Images/NodeScoringScoreLow.en.png)
- If the fringe around the target node is highlighted, it indicates that the target node has a higher score than the nodes that are located at the same distance from the source node and are usually a simpler score.
  - Nodes with higher than normal scores
    - ![NodeScoringWithAttention](../Images/NodeScoringWithAttention.en.png)
  - Nodes with normal scores
    - ![NodeScoringWithoutAttention](../Images/NodeScoringWithoutAttention.en.png)
