import OpenAI from 'openai';
import {
	userPrompt2,
	userPrompt3,
	userPrompt4,
	userPrompt5,
	userPrompt6,
	userPrompt7,
	userPrompt8,
	userPrompt9,
	userPrompt10,
	userPrompt11,
} from './promptStepN';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function executeStepN(n: number, textCerita: string) {
	try {
		let prompt = '';
		switch (n) {
			case 2:
				prompt = userPrompt2(textCerita);
				break;
			case 3:
				prompt = userPrompt3(textCerita);
				break;
			case 4:
				prompt = userPrompt4(textCerita);
				break;
			case 5:
				prompt = userPrompt5(textCerita);
				break;
			case 6:
				prompt = userPrompt6(textCerita);
				break;
			case 7:
				prompt = userPrompt7(textCerita);
				break;
			case 8:
				prompt = userPrompt8(textCerita);
				break;
			case 9:
				prompt = userPrompt9(textCerita);
				break;
			case 10:
				prompt = userPrompt10(textCerita);
				break;
			case 11:
				prompt = userPrompt11(textCerita);
				break;
			default:
				return {
					success: false,
					error: `Invalid step number: ${n}`,
				};
		}

		const response = await openai.images.generate({
			model: 'gpt-image-1',
			prompt,
		});

		const image_base64 = response.data?.[0]?.b64_json;

		if (!image_base64) {
			return {
				success: false,
				error: 'No image data received from API',
			};
		}

		const image_bytes = Buffer.from(image_base64, 'base64');

		return {
			success: true,
			data: image_bytes,
		};
	} catch (error) {
		console.error(`Error executing step ${n}:`, error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}
