import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';
import { ICaptionGenerator } from '../domain/ICaptionGenerator';

export default class CaptionGenerator implements ICaptionGenerator {
    async generate(imageUrl: string): Promise<string> {

        const features = [
            'Caption',
            'Read'
        ];

        const client = this.getClient();

        const result = await client.path('/imageanalysis:analyze').post({
            body: {
                url: imageUrl,
            },
            queryParameters: {
                features: features
            },
            contentType: 'application/json'
        });
        
        let caption = ""

        const iaResult = result.body;

        // if result is error response, return the error
        if (typeof iaResult === 'object' && 'error' in iaResult) {
            console.error('Error analyzing image:', iaResult.error);
            return `Error analyzing image: ${iaResult.error.message}`;
        }

        if (iaResult.captionResult) {
            console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
            caption = iaResult.captionResult.text;
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