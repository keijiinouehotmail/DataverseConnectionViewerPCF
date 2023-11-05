import { AskResponse, Citation } from '../api/modelsForChat';

type ParsedAnswer = {
    citations: Citation[];
    markdownFormatText: string;
};

export function parseAnswer(answer: AskResponse): ParsedAnswer {
    let answerText = answer.answer;
    const citationLinks = answerText.match(/\[(doc\d\d?\d?)]/g);

    const lengthDocN = "[doc".length;

    let filteredCitations = [] as Citation[];
    let citationReindex = 0;
    citationLinks?.forEach((link: any) => {
        // Replacing the links/citations with number
        let citationIndex = link.slice(lengthDocN, link.length - 1);
        if (!filteredCitations.find((c) => c.id === citationIndex)) {
          answerText = answerText.replace(link, ` ^${++citationReindex}^ `);
        }
    })

    return {
        citations: filteredCitations,
        markdownFormatText: answerText
    };
}
