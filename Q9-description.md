<!--- Write a description of the functionality you implemented for question 9 here.  No special formatting is required; however, if desired you can use the basic markdown syntax (https://www.markdownguide.org/cheat-sheet/) and view the result by right-clicking the file and selecting 'Open Preview'. -->

I created a view (with associated routing functions) that allows a user to create a new blog post.  This functionality allows users to create new blog posts with an associated image, title, summary, and content. I also used Multer to handle file uploads.

I added more functions to blogController.js. One function handled the creation of a new blog post, allowing users to upload an image and fill out a form with the necessary information. Then I added a function that rendered the 'new-blog-post' view, which displayed the form for creating a new blog post.

I modified blogRoutes.js to have image upload. I added routes for rendering the form for creating a new blog post and handling the actual blog post creation.

I created the 'new-blog-post' view using the POST method and multipart/form-data encoding to submit the form data and the image file.