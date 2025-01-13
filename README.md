# URL Shortener

A modern URL shortener built with Next.js and shadcn/ui. Create shortened URLs, track their performance, and manage them with ease.

## Features

- 🔗 Shorten long URLs to concise, shareable links
- ⏱️ Set custom expiration times for links
- 📊 Track URL statistics and analytics
- 🎨 Modern, responsive UI built with shadcn/ui
- ⌨️ Command menu (⌘K) for quick navigation

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/ronniesong0809/url-shortener-next.git
cd url-shortener-next
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_BACKEND_URL=your_backend_url
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Usage

1. **Create Short URL**
   - Enter a long URL
   - Choose expiration time (optional)
   - Click "Shorten URL"

2. **View Statistics**
   - Click on the chart icon next to any URL
   - View clicks, browser info, and more

3. **Quick Navigation**
   - Use ⌘K to open command menu
   - Search and navigate quickly

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
