import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';

export default class StoryGenerator {
  // eslint-disable-next-line no-unused-vars
  async generate(_image, _context) {
    console.log('Generating story from image:', _image);

    const features = [
      'Caption',
      'Read'
    ];

    const client = this.getClient();

    const result = await client.path('/imageanalysis:analyze').post({
      body: {
        url: _image,
      },
      queryParameters: {
        features: features
      },
      contentType: 'application/json'
    });

    const iaResult = result.body;

    console.log('Image Analysis Result:', JSON.stringify(iaResult, null, 2));

    if (iaResult.captionResult) {
      console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
      return iaResult.captionResult.text;
    }
    if (iaResult.readResult) {
      iaResult.readResult.blocks.forEach(block => console.log(`Text Block: ${JSON.stringify(block)}`));
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
