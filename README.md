# Chrome Extension Open My Post
> This extension allows a user to enter a Post ID and load the related post and its comments into the current page.
	
# Features
- Chrome extension built using es6
- It's only built for chrome, not firefox, etc.
- Posts and comments are consumed from the API at `https://jsonplaceholder.typicode.com`
- Text input to capture a Post ID
- Post loads in the html page (overwrites whatever page is being shown)
- Present comments of the post below the Post.
- Background script requests posta and associated comments from API
- Reduced number of API calls to reduce server load by caching response data to be availble across all tabs.
- Use MustacheJS to parse and render post-template.html

# Installation

- Please either clone this repository or download as a ZIP file.
- Extract the contents into your preferred working directory.
- To install the required dependencies, please access directory and run: npm install 
- Open your Google Chrome browser.
- Enter `chrome://extensions/` into the address bar.
- Ensure "Developer Mode" is ticked/enabled in the top right.
- Click on "Load unpacked extension...".
- Navigate to your extracted directory, and click "OK".
- The installed extension should now be alongside your address bar.

# Usage
1. After installing this extension, navigate to a web page over the internet. 
2. Click on the newly installed extension icon on the top right of the address bar.
3. A small popup comes up, enter a post ID, a number between 1-100 (Above 100 it will result in error)
4. Click Load Post or just hit ENTER.
5. The current page has been replaced with a Post and its Comments. 