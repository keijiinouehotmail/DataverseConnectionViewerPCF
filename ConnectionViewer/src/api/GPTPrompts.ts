import { IGPTRequestFunction, IGPTRequestMessage } from "./modelsForAOAI";

export enum GPTFunctionNames {
    describe_connections = "describe_connections",
    analyze_impact_of_connections = "analyze_impact_of_connections",
    expand_the_card_to_a_certain_distance = "expand_the_card_to_a_certain_distance",
}

export class GPTPrompts {
    public static readonly systemMessage: IGPTRequestMessage = {
        "role": "system",
        "content": "You are an AI assistant that helps people find information."
    };
    /**
     * Assumed temperature = 0.9 when calling the function.
     */
    public static readonly functions: IGPTRequestFunction[] = [
        /**
         * analyze_impact_of_connections
         * Expected prompt: 
         *   - Analyze the strength of the influence of people and companies related to Ryan Brim.
         *   - I would like to propose a product to Jennifer Rivas. How strong are the people around you involved in her? Analyze.
         *   - Analyze how influential "10 units of AR025" are from the information of the connection.
         *   - 森山三郎と関係している人物や会社の影響の強さを分析してください。
         *   - 赤城 紀子さんに商品を提案したいです。周りの方々がどのような強さで彼女に関与していますか？分析してください。
         *   - "AR025を10台" がどれほどの影響力を持っているのか、そのつながりから分析してください。
         * Implementation: GPTFunctionAnalyzeImpactOfConnections.ts
         */
         {
            "name": GPTFunctionNames.analyze_impact_of_connections,
            "description": "Analyze the strength of the connection to a specific target. Connections are made up of different objects, each with a variable intensity of influence.",
            "parameters": {
                "type": "object",
                "properties": {
                    "target": {
                        "type": "string",
                        "description": "The specific target"
                    }
                },
                "required": ["target"]
            }
        },
        /**
         * describe_connections
         * Expected prompt: 
         *   - Tell me about the people and companies associated with Ryan Brim
         *   - I would like to propose a product to Jennifer Rivas. What information has with her and what connection?
         *   - What is the connection to "10 units of AR025"?
         *   - 森山三郎と関係している人物や会社を教えて
         *   - 赤城 紀子さんに商品を提案したいです。彼女にはどのような方々からどのようなつながりを持っていますか？
         *   - "AR025を10台" とのつながりを教えて
         * Implementation: GPTFunctionAnalyzeImpactOfConnections.ts
         */
        {
            "name": GPTFunctionNames.describe_connections,
            "description": "Describe the connection of a specific target to various other objects. Should only describe, do not analyze the strength of the connection.",
            "parameters": {
                "type": "object",
                "properties": {
                    "target": {
                        "type": "string",
                        "description": "The specific target"
                    }
                },
                "required": []
            }
        },
        /**
         * expand_the_card_to_a_certain_distance
         * Expected prompt:
         *   - Expand two cards from Ryan Brim
         *   - Expand two records related to Ryan Brim
         *   - Expand the card from Ryan Brim
         *   - Expand three records related to Ken Kajisa
         *   - 森山 三郎からカードを2つ展開して
         *   - 森山 三郎から関係するレコードを2つ展開して
         *   - 森山 三郎からカードを展開して
         *   - 加治佐 健から関係するレコードを３つ展開して
         * Implementation: GPTFunctionExpandTheCardToACertainDistance.ts
         * Attention: "distance" is not required, so there should be an upper limit in the code.
         */
        {
            "name": GPTFunctionNames.expand_the_card_to_a_certain_distance,
            "description": "Expand the target card or record to a certain distance. Expanding and clicking are the same.",
            "parameters": {
                "type": "object",
                "properties": {
                    "target": {
                        "type": "string",
                        "description": "The specific target"
                    },
                    "distance": {
                        "type": "number",
                        "description": "The distance to expand"
                    }
                },
                "required": ["target"]
            }
        },
    ];
}