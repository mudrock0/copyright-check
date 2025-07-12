// app.js

// This is a simulated database of "video assets" and their associated YouTube URLs.
// In a real-world scenario, these assets would be managed via the YouTube Content ID API
// on a backend server, and the matching would happen there.
const simulatedVideoAssets = [
    {
        id: 'asset-001',
        title: 'Official Music Video - Song A',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Astley - Never Gonna Give You Up
        contentId: 'CID-ABC-123'
    },
    {
        id: 'asset-002',
        title: 'Documentary Clip - Nature Wonders',
        youtubeUrl: 'https://www.youtube.com/watch?v=k_okcNVzIAo', // Example nature video
        contentId: 'CID-DEF-456'
    },
    {
        id: 'asset-003',
        title: 'Short Film - The Urban Explorer',
        youtubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', // Example short film
        contentId: 'CID-GHI-789'
    },
    {
        id: 'asset-004',
        title: 'Product Review - Gadget X',
        youtubeUrl: 'https://www.youtube.com/watch?v=C0DPdy98e4c', // Example product review
        contentId: 'CID-JKL-012'
    }
];

// Get references to the HTML elements
const videoUrlInput = document.getElementById('videoUrl');
const matchButton = document.getElementById('matchButton');
const resultDiv = document.getElementById('result');

// Your provided API Key (for demonstration purposes with a hypothetical backend call)
// In a real application, this would be securely stored on a server and not exposed client-side.
const API_KEY = "AIzaSyBeo4NGA__U6Xxy-aBE6yFm19pgq8TY-TM";

/**
 * Extracts the YouTube video ID from a given YouTube URL.
 * Supports various YouTube URL formats.
 * @param {string} url - The YouTube video URL.
 * @returns {string|null} The video ID or null if not found.
 */
function getYouTubeVideoId(url) {
    let videoId = null;
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match && match[1]) {
        videoId = match[1];
    }
    return videoId;
}

/**
 * Matches the entered YouTube video URL with simulated video assets.
 * Displays the result in the resultDiv.
 */
async function matchVideoAsset() { // Added async keyword
    const enteredUrl = videoUrlInput.value.trim();
    resultDiv.classList.add('hidden'); // Hide previous results
    resultDiv.classList.remove('text-red-600', 'text-green-600'); // Reset text colors
    resultDiv.innerHTML = ''; // Clear previous content

    if (!enteredUrl) {
        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('text-red-600');
        resultDiv.innerHTML = '<p class="font-semibold">Please enter a YouTube video URL.</p>';
        return;
    }

    const enteredVideoId = getYouTubeVideoId(enteredUrl);

    if (!enteredVideoId) {
        resultDiv.classList.remove('hidden');
        resultDiv.classList.add('text-red-600');
        resultDiv.innerHTML = '<p class="font-semibold">Invalid YouTube URL format. Please try again.</p>';
        return;
    }

    // Display a loading message while simulating the "API call"
    resultDiv.classList.remove('hidden');
    resultDiv.classList.add('text-gray-700');
    resultDiv.innerHTML = '<p class="font-semibold">Matching video... (Simulating API call)</p>';

    // --- Start of simulated API call section ---
    // In a real application, you would make a fetch request to your backend here.
    // Your backend would then use the YouTube Content ID API with the API_KEY.
    try {
        // Example of a hypothetical fetch call to a backend endpoint
        // This is commented out because it's not a real endpoint for YouTube Content ID API
        /*
        const response = await fetch(`https://your-backend.com/api/match-contentid?videoId=${enteredVideoId}&apiKey=${API_KEY}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Potentially other headers like authorization tokens
            }
        });
        const data = await response.json();
        // Process data from your backend
        */

        // Simulate network delay for demonstration
        await new Promise(resolve => setTimeout(Math.random() * 1000 + 500, resolve)); // 0.5 to 1.5 seconds delay

        // Simulate API call and matching using our local data for this client-side example
        let matchedAsset = null;
        for (const asset of simulatedVideoAssets) {
            const assetVideoId = getYouTubeVideoId(asset.youtubeUrl);
            if (assetVideoId === enteredVideoId) {
                matchedAsset = asset;
                break;
            }
        }

        // Display results
        resultDiv.classList.remove('hidden', 'text-gray-700'); // Remove loading text color
        if (matchedAsset) {
            resultDiv.classList.add('text-green-600');
            resultDiv.innerHTML = `
                <p class="font-bold text-lg mb-2">Match Found!</p>
                <p><span class="font-semibold">Asset Title:</span> ${matchedAsset.title}</p>
                <p><span class="font-semibold">Simulated Content ID:</span> ${matchedAsset.contentId}</p>
                <p><span class="font-semibold">Associated URL:</span> <a href="${matchedAsset.youtubeUrl}" target="_blank" class="text-blue-600 hover:underline">${matchedAsset.youtubeUrl}</a></p>
            `;
        } else {
            resultDiv.classList.add('text-red-600');
            resultDiv.innerHTML = `
                <p class="font-bold text-lg mb-2">No Match Found.</p>
                <p>The entered video URL does not match any known assets in our simulated database.</p>
            `;
        }

    } catch (error) {
        console.error("Error during simulated API call:", error);
        resultDiv.classList.remove('hidden', 'text-gray-700');
        resultDiv.classList.add('text-red-600');
        resultDiv.innerHTML = `
            <p class="font-bold text-lg mb-2">An error occurred.</p>
            <p>Please check the console for details. (This is a simulated error handling).</p>
        `;
    }
    // --- End of simulated API call section ---
}

// Add event listener to the button
matchButton.addEventListener('click', matchVideoAsset);

// Optional: Allow pressing Enter key in the input field to trigger the match
videoUrlInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission if any
        matchVideoAsset();
    }
});
