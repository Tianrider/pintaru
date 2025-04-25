import { executeStep1 } from './step1';
import { executeStepN } from './stepN';
import { executeStep12 } from './step12';

type ProgressStatus = {
	step: number;
	message: string;
	totalSteps: number;
	completed: boolean;
	data?: {
		text?: string;
		page?: number | string;
	};
};

type ProgressCallback = (status: ProgressStatus) => void;

export async function createStorybook(
	tema: string,
	character: string,
	onProgress?: ProgressCallback
) {
	const totalSteps = 12;

	// Step 1: Create story text
	onProgress?.({
		step: 1,
		totalSteps,
		message: 'Generating story text...',
		completed: false,
	});

	const teksCerita = await executeStep1(tema, character);

	if (!teksCerita.success) {
		onProgress?.({
			step: 1,
			totalSteps,
			message: `Error generating story: ${teksCerita.error}`,
			completed: true,
		});

		return {
			success: false,
			error: teksCerita.error,
		};
	}

	onProgress?.({
		step: 1,
		totalSteps,
		message: 'Story text generated successfully',
		completed: true,
		data: { text: teksCerita.data || '' },
	});

	if (typeof teksCerita.data !== 'string') {
		onProgress?.({
			step: 1,
			totalSteps,
			message: 'Invalid story data format',
			completed: true,
		});

		return {
			success: false,
			error: 'Invalid story data format',
		};
	}

	// Step 2: Generate page 1 image
	onProgress?.({
		step: 2,
		totalSteps,
		message: 'Generating page 1 illustration...',
		completed: false,
	});

	const image1 = await executeStepN(2, teksCerita.data);

	onProgress?.({
		step: 2,
		totalSteps,
		message: image1.success
			? 'Page 1 illustration generated'
			: 'Failed to generate page 1 illustration',
		completed: true,
		data: image1.success ? { page: 1 } : undefined,
	});

	// Step 3: Generate page 2 image
	onProgress?.({
		step: 3,
		totalSteps,
		message: 'Generating page 2 illustration...',
		completed: false,
	});

	const image2 = await executeStepN(
		3,
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 3,
		totalSteps,
		message: image2.success
			? 'Page 2 illustration generated'
			: 'Failed to generate page 2 illustration',
		completed: true,
		data: image2.success ? { page: 2 } : undefined,
	});

	// Step 4: Generate page 3 image
	onProgress?.({
		step: 4,
		totalSteps,
		message: 'Generating page 3 illustration...',
		completed: false,
	});

	const image3 = await executeStepN(
		4,
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 4,
		totalSteps,
		message: image3.success
			? 'Page 3 illustration generated'
			: 'Failed to generate page 3 illustration',
		completed: true,
		data: image3.success ? { page: 3 } : undefined,
	});

	// Step 5: Generate page 4 image
	onProgress?.({
		step: 5,
		totalSteps,
		message: 'Generating page 4 illustration...',
		completed: false,
	});

	const image4 = await executeStepN(
		5,
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 5,
		totalSteps,
		message: image4.success
			? 'Page 4 illustration generated'
			: 'Failed to generate page 4 illustration',
		completed: true,
		data: image4.success ? { page: 4 } : undefined,
	});

	// Step 6: Generate page 5 image
	onProgress?.({
		step: 6,
		totalSteps,
		message: 'Generating page 5 illustration...',
		completed: false,
	});

	const image5 = await executeStepN(
		6,
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 6,
		totalSteps,
		message: image5.success
			? 'Page 5 illustration generated'
			: 'Failed to generate page 5 illustration',
		completed: true,
		data: image5.success ? { page: 5 } : undefined,
	});

	// Step 7: Generate page 6 image
	onProgress?.({
		step: 7,
		totalSteps,
		message: 'Generating page 6 illustration...',
		completed: false,
	});

	const image6 = await executeStepN(
		7,
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 7,
		totalSteps,
		message: image6.success
			? 'Page 6 illustration generated'
			: 'Failed to generate page 6 illustration',
		completed: true,
		data: image6.success ? { page: 6 } : undefined,
	});

	// Step 8: Generate page 7 image
	onProgress?.({
		step: 8,
		totalSteps,
		message: 'Generating page 7 illustration...',
		completed: false,
	});

	const image7 = await executeStepN(
		8,
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 8,
		totalSteps,
		message: image7.success
			? 'Page 7 illustration generated'
			: 'Failed to generate page 7 illustration',
		completed: true,
		data: image7.success ? { page: 7 } : undefined,
	});

	// Step 9: Generate page 8 image
	onProgress?.({
		step: 9,
		totalSteps,
		message: 'Generating page 8 illustration...',
		completed: false,
	});

	const image8 = await executeStepN(
		9,
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 9,
		totalSteps,
		message: image8.success
			? 'Page 8 illustration generated'
			: 'Failed to generate page 8 illustration',
		completed: true,
		data: image8.success ? { page: 8 } : undefined,
	});

	// Step 10: Generate page 9 image
	onProgress?.({
		step: 10,
		totalSteps,
		message: 'Generating page 9 illustration...',
		completed: false,
	});

	const image9 = await executeStepN(
		10,
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 10,
		totalSteps,
		message: image9.success
			? 'Page 9 illustration generated'
			: 'Failed to generate page 9 illustration',
		completed: true,
		data: image9.success ? { page: 9 } : undefined,
	});

	// Step 11: Generate page 10 image
	onProgress?.({
		step: 11,
		totalSteps,
		message: 'Generating page 10 illustration...',
		completed: false,
	});

	const image10 = await executeStepN(
		11,
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 11,
		totalSteps,
		message: image10.success
			? 'Page 10 illustration generated'
			: 'Failed to generate page 10 illustration',
		completed: true,
		data: image10.success ? { page: 10 } : undefined,
	});

	// Step 12: Generate cover image
	onProgress?.({
		step: 12,
		totalSteps,
		message: 'Generating cover illustration...',
		completed: false,
	});

	const image0 = await executeStep12(
		teksCerita.data,
		image1.success ? image1.data : undefined
	);

	onProgress?.({
		step: 12,
		totalSteps,
		message: image0.success
			? 'Cover illustration generated'
			: 'Failed to generate cover illustration',
		completed: true,
		data: image0.success ? { page: 'cover' } : undefined,
	});

	return {
		success: true,
		data: {
			story: teksCerita.data,
			images: {
				cover: image0.success ? image0.data : null,
				page1: image1.success ? image1.data : null,
				page2: image2.success ? image2.data : null,
				page3: image3.success ? image3.data : null,
				page4: image4.success ? image4.data : null,
				page5: image5.success ? image5.data : null,
				page6: image6.success ? image6.data : null,
				page7: image7.success ? image7.data : null,
				page8: image8.success ? image8.data : null,
				page9: image9.success ? image9.data : null,
				page10: image10.success ? image10.data : null,
			},
		},
	};
}
