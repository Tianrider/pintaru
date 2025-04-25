import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function executeStep12(textCerita: string) {
	try {
		const prompt = createCoverPrompt(textCerita);

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
		console.error('Error executing step 12:', error);
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error',
		};
	}
}

function createCoverPrompt(textCerita: string): string {
	return `Anda adalah seorang **pendongeng** yang familiar dengan bagaimana cara anak kecil membaca dan memahami teks dan visual cerita pendek untuk mendapatkan nilai moralnya. Tujuan utama Anda adalah untuk membuat sebuah buku cerita pendek bergambar yang terdiri dari 10 halaman cerita landscape (1 paragraf per halaman) dan 1 halaman cover landscape, menceritakan sebuah tokoh berdasarkan keinginan pengguna, di mana cerita tersebut berisi pesan moral berdasarkan keinginan pengguna juga. Anda akan melakukannya dengan prompt chaining secara bertahap. Saya akan memberikan instruksi dan detail lengkapnya berikut ini.

**INSTRUKSI:**
Buatlah buku cerita pendek yang mengutamakan visual gambar yang menarik bagi anak balita secara step by step. Sekarang, Anda akan mengerjakan langkah nomor 12:
1. ✅ Buatlah skrip dongeng cerita pendek beserta judulnya. (Sudah ada di prompt ini)

2. ✅ Untuk setiap paragraf dari total 10 paragraf tersebut, buatlah sebuah ilustrasi visual yang menggambarkan situasi di setiap paragraf—kita akan mulai dari paragraf ke-1, gunakan kriteria gambar yang sudah disebutkan di atas.
3. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-2, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
4. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-3, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
5. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-4, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
6. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-5, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
7. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-6, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
8. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-7, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
9. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-8, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
10. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-9, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.
11. ✅ Lanjut, buatlah ilustrasi visual untuk paragraf ke-10, dengan kriteria image generation yang sudah disebutkan di atas, sama dengan step 1 dan seterusnya.

12. [NOW] Setelah 10 ilustrasi untuk 10 paragraf selesai terbentuk semua, saatnya Anda untuk membuat cover cerita yang menarik, gunakan kriteria gambar berikut dalam proses pembuatan gambar:
	- Gunakan gambar wireframe layout (Gambar 1) yang sudah saya lampirkan sebagai layout dasar pembuatan ilustrasi: Teks judul di atas dan ilustrasi yang memuat karakter utama dan lingkungan di bawahnya.
	- Gunakan font serif untuk teks. 
	- Gunakan Disney illustration style.
	- Gambar memiliki rasio landscape (1536 * 1024). 

**NOTES:**
- Untuk setiap instruksi, JAWAB HANYA DENGAN HAL YANG DIMINTA tanpa informasi dan teks lain yang Anda sampaikan.
	- Misalkan Anda diminta untuk membuat teks di step 1, hanya return teksnya saja!
	- Untuk step 2-12, hanya return gambar saja tanpa penjelasan atau teks apa-apa!
- Selalu perhatikan konteks cerita.
- Pastikan style dari semua ilustrasi konsisten.

**TEKS CERITA:**
${textCerita}`;
}
