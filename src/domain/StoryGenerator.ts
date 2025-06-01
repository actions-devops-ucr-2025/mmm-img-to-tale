import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';

export default class StoryGenerator {
  async generate(imageUrl: string, context: string) {
    
    console.log('Generating story from image:', imageUrl);

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

    const iaResult = result.body;

    // if result is error response, return the error
    if (typeof iaResult === 'object' && 'error' in iaResult) {
      console.error('Error analyzing image:', iaResult.error);
      return `Error analyzing image: ${iaResult.error.message}`;
    }

    console.log('Image Analysis Result:', JSON.stringify(iaResult, null, 2));

    if (iaResult.captionResult) {
      console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
      return iaResult.captionResult.text;
    }
    return 'No caption found in the image.';
  }

  getClient() {

    console.log('Creating Azure Vision client');

    // Load the .env file if it exists

    const endpoint = ""
    const key = ""

    console.log('Using endpoint:', {endpoint,key});

    const credential = new AzureKeyCredential(key);
    return createClient(endpoint, credential);
  }

}
