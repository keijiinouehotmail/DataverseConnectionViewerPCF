import { useEffect, useMemo, useState } from "react";
import { useBoolean } from "@fluentui/react-hooks"
import { FontIcon, Stack, Text, mergeStyleSets } from "@fluentui/react";
import { AskResponse, Citation } from '../api/modelsForChat';
import { parseAnswer } from './AnswerParser'
import ReactMarkdown from "react-markdown";
import React = require("react");
import { ConnectionViewer } from "../ConnectionViewer";

interface Props {
    answer: AskResponse;
}

export const Answer = ({
    answer,
}: Props) => {
    const [isRefAccordionOpen, { toggle: toggleIsRefAccordionOpen }] = useBoolean(false);
    const filePathTruncationLimit = 50;

    const parsedAnswer = useMemo(() => parseAnswer(answer), [answer]);
    const [chevronIsExpanded, setChevronIsExpanded] = useState(isRefAccordionOpen);

    const handleChevronClick = () => {
        setChevronIsExpanded(!chevronIsExpanded);
        toggleIsRefAccordionOpen();
    };

    useEffect(() => {
        setChevronIsExpanded(isRefAccordionOpen);
    }, [isRefAccordionOpen]);

    const createCitationFilepath = (citation: Citation, index: number, truncate: boolean = false) => {
        let citationFilename = "";

        if (citation.filepath && citation.chunk_id) {
            if (truncate && citation.filepath.length > filePathTruncationLimit) {
                const citationLength = citation.filepath.length;
                citationFilename = `${citation.filepath.substring(0, 20)}...${citation.filepath.substring(citationLength - 20)} - Part ${parseInt(citation.chunk_id) + 1}`;
            }
            else {
                citationFilename = `${citation.filepath} - Part ${parseInt(citation.chunk_id) + 1}`;
            }
        }
        else if (citation.filepath && citation.reindex_id) {
            citationFilename = `${citation.filepath} - Part ${citation.reindex_id}`;
        }
        else {
            citationFilename = `Citation ${index}`;
        }
        return citationFilename;
    }

    return (
        <>
            <Stack className={contentStyles.answerContainer} tabIndex={0}>
                <Stack.Item grow>
                    <ReactMarkdown
                        linkTarget="_blank"
                        children={parsedAnswer.markdownFormatText}
                        className={contentStyles.answerText}
                    />
                </Stack.Item>
                <Stack horizontal className={contentStyles.answerFooter}>
                    {!!parsedAnswer.citations.length && (
                        <Stack.Item
                            onKeyDown={e => e.key === "Enter" || e.key === " " ? toggleIsRefAccordionOpen() : null}
                        >
                            <Stack style={{ width: "100%" }} >
                                <Stack horizontal horizontalAlign='start' verticalAlign='center'>
                                    <Text
                                        className={contentStyles.accordionTitle}
                                        onClick={toggleIsRefAccordionOpen}
                                        aria-label="Open references"
                                        tabIndex={0}
                                        role="button"
                                    >
                                        <span>{parsedAnswer.citations.length > 1 ? parsedAnswer.citations.length + " references" : "1 reference"}</span>
                                    </Text>
                                    <FontIcon className={contentStyles.accordionIcon}
                                        onClick={handleChevronClick} iconName={chevronIsExpanded ? 'ChevronDown' : 'ChevronRight'}
                                    />
                                </Stack>

                            </Stack>
                        </Stack.Item>
                    )}
                    <Stack.Item className={contentStyles.answerDisclaimerContainer}>
                        <span className={contentStyles.answerDisclaimer}>{ConnectionViewer.cv.resStr('AIGeneratedContentMayBeIncorrect')}</span>
                    </Stack.Item>
                </Stack>
                {chevronIsExpanded &&
                    <div style={{ marginTop: 8, display: "flex", flexFlow: "wrap column", maxHeight: "150px", gap: "4px" }}>
                        {parsedAnswer.citations.map((citation, idx) => {
                            return (
                                <span
                                    title={createCitationFilepath(citation, ++idx)}
                                    tabIndex={0}
                                    role="link"
                                    key={idx}
                                    className={contentStyles.citationContainer}
                                    aria-label={createCitationFilepath(citation, idx)}
                                >
                                    <div className={contentStyles.citation}>{idx}</div>
                                    {createCitationFilepath(citation, idx, true)}
                                </span>);
                        })}
                    </div>
                }
            </Stack>
        </>
    );
};

const contentStyles = mergeStyleSets({
    answerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '8.1285px',
        gap: '5.42px',
        background: '#FFFFFF',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)',
        borderRadius: '5.419px',
    },
    answerText: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '20px',
        color: '#323130',
        flex: 'none',
        order: '1',
        alignSelf: 'stretch',
        flexGrow: '0',
        margin: '4px',
        textAlign: 'left',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        maxWidth: '800px',
        overflowX: 'auto',
    },
    answerFooter: {
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '100%',
        height: 'auto',
        boxSizing: 'border-box',
        justifyContent: 'space-between',
    },
    answerDisclaimerContainer: {
        justifyContent: 'center',
        display: 'flex',
    },
    answerDisclaimer: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '16px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        color: '#707070',
        flex: 'none',
        order: '1',
        flexGrow: '0',
    },
    citationContainer: {
        marginLeft: '10px',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '12px',
        lineHeight: '16px',
        color: '#115EA3',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '4px 6px',
        gap: '4px',
        border: '1px solid #D1D1D1',
        borderRadius: '4px',
        ':hover:': {  // This syntax <https://github.com/microsoft/fluentui/blob/master/packages/merge-styles/README.md>
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    },
    citation: {
        boxSizing: 'border-box',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        width: '14px',
        height: '14px',
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        flex: 'none',
        flexGrow: '0',
        zIndex: '2',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '10px',
        lineHeight: '14px',
        textAlign: 'center',
        color: '#424242',
        cursor: 'pointer',
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    },
    accordionIcon: {
        display: 'inline-flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px',
        marginTop: '4px',
        color: '#616161',
        fontSize: '10px',
        ':hover:': {
            cursor: 'pointer',
        },
    },
    accordionTitle: {
        marginRight: '5px',
        marginLeft: '10px',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '16px',
        display: 'flex',
        alignItems: 'center',
        color: '#616161',
        ':hover:': {
            cursor: 'pointer',
        },
    },
});
