# Universal Social Media Downloader

A Flask-based web application for downloading content from various social media platforms including YouTube, Instagram, Twitter, and Facebook.

## Features

- **Multi-platform support**: Download from YouTube, Instagram, Twitter, and Facebook
- **Multiple content types**: Videos, images, stories, reels, posts, and more
- **Bulk downloads**: Download multiple URLs at once
- **High-quality downloads**: Best available quality with subtitles support
- **Modern UI**: Clean, responsive web interface with dark theme
- **Download management**: View and manage your downloaded files

## Supported Platforms

- **YouTube**: Videos, shorts, playlists
- **Instagram**: Posts, reels, stories, IGTV
- **Twitter/X**: Videos, images, threads
- **Facebook**: Videos, posts
- **Generic**: Other platforms supported by yt-dlp

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/universal-downloader.git
cd universal-downloader
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python app.py
```

4. Open your browser and navigate to `http://localhost:5000`

## Requirements

- Python 3.7+
- Flask
- yt-dlp
- instaloader
- requests

## Usage

1. **Single Download**: Enter a URL and click "Download Content"
2. **Bulk Download**: Switch to the "Bulk Download" tab and enter multiple URLs (one per line)
3. **My Downloads**: View and download your saved files

## Project Structure

```
universal-downloader/
├── app.py                 # Main Flask application
├── static/
│   ├── css/
│   │   └── style.css      # Stylesheets
│   ├── script.js          # Frontend JavaScript
│   └── background.jpg     # Background image
├── templates/
│   └── index.html         # Main HTML template
├── downloads/             # Downloaded files directory
└── README.md             # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This tool is for educational purposes only. Please respect the terms of service of the platforms you download from and ensure you have the right to download the content.
