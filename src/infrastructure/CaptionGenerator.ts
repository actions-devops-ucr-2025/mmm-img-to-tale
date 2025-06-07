import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';
import { ICaptionGenerator } from '../domain/ICaptionGenerator';

export default class CaptionGenerator implements ICaptionGenerator {
    async generate(imageUrl: string): Promise<string> {

        const features = ["Caption", "DenseCaptions", "Objects", "People", "Read", "SmartCrops", "Tags"];

        const client = this.getClient();

        const result = await client.path('/imageanalysis:analyze').post({
            body: {
                url: imageUrl,
            },
            queryParameters: {
                features: features,
                "smartCrops-aspect-ratios": [0.9, 1.33],
            },
            contentType: 'application/json'
        });
        
        let caption = ""

        const iaResult = result.body;

        console.log('Image Analysis Result:', iaResult);

        // if result is error response, return the error
        if (typeof iaResult === 'object' && 'error' in iaResult) {
            console.error('Error analyzing image:', iaResult.error);
            return `Error analyzing image: ${iaResult.error.message}`;
        }

        if (iaResult.captionResult) {
            caption += "Short Caption: "+ iaResult.captionResult.text + "\n";
        }

        if (iaResult.denseCaptionsResult) {
            iaResult.denseCaptionsResult.values.forEach((denseCaption: any) => {
                caption += `Dense Caption: ${denseCaption.text}\n`;
            });
        }

        if (iaResult.readResult) {
            iaResult.readResult.blocks.forEach((element: any) => {
                element.lines.forEach((line: any) => {
                    caption += `Read Text: ${line.text}\n`;
                });
            });
        }

        console.log('Caption:', caption);
        
        return caption;
    }

    getClient() {

        console.log('Creating Azure Vision client');

        const env = import.meta.env;

        const endpoint = env.VITE_VISION_ENDPOINT
        const key = env.VITE_VISION_KEY

        const credential = new AzureKeyCredential(key);
        return createClient(endpoint, credential);
    }

}