import { ITaleGenerator } from "../domain/ITaleGenerator";
import createClient from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

export class TaleGenerator implements ITaleGenerator {

  async generate(caption: string, context: string): Promise<string> {

    const client = this.getClient();

    const env = import.meta.env;
    const modelName = env.VITE_OPENAI_MODEL_NAME;

    console.log('Generating tale with model:', modelName);
    const response = await client.path("/chat/completions").post({
        body: {
        messages: [
            { role:"system", content: `
                    Eres un experto en generar cuentos a partir de un caption de una imagen y un breve contexto.
                    El cuento debe ser creativo, interesante y relacionado con el caption y el contexto proporcionados.
                    El cuento debe tener una estructura narrativa coherente, con un inicio, desarrollo y desenlace.
                    El cuento deber ser fiel al caption y al contexto proporcionados en español. Traduce el caption y el contexto al español si es necesario.
                    El caption debe aparecer en el cuento de forma natural y relevante.
                    Este es el caption de la imagen: "${caption}".
                    Este es el contexto: "${context}".
                    No debes generar mas de 500 palabras.
                ` },
        ],
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        model: modelName
        }
    });

    if (typeof response === 'object' && 'error' in response.body) {
        console.error('Error generating tale:', response.body.error);
        throw new Error(`Error generating tale: ${response.body.error.message}`);
    }

    if (typeof response.body === 'object' && 'choices' in response.body) {
        return response.body.choices[0].message.content?.toString() || "No tale generated.";
    }

    return "No tale generated.";
  }

  getClient() {
    const env = import.meta.env;
    const endpoint = env.VITE_OPENAI_ENDPOINT;
    const modelName = env.VITE_OPENAI_MODEL_NAME;
    const APIKey = env.VITE_OPENAI_API_KEY;
    console.log('Creating Azure OpenAI client');
    return createClient(`${endpoint}/${modelName}`, new AzureKeyCredential(APIKey));
  }
}