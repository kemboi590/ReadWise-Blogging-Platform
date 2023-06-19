
--create table Users
CREATE TABLE Users (
UserID INT IDENTITY(1,1) PRIMARY KEY,
UserName VARCHAR(255),
Email VARCHAR(255),
hashedPassword VARCHAR(255),
Role VARCHAR (100),
)

--create table BlogPost

CREATE TABLE BlogPost(
	PostID  INT IDENTITY(1,1) PRIMARY KEY,
    UserID INT FOREIGN KEY REFERENCES Users(UserID) ON DELETE CASCADE,
    Title VARCHAR(255) NOT NULL,
	BlogDesc VARCHAR(500) NOT NULL,
    Content VARCHAR(MAX) NOT NULL,
    Category VARCHAR(50),
    CreatedAt DATE,
    UpdatedAt DATE
)

--create table Comments

CREATE TABLE Comments (
    CommentID INT IDENTITY(1,1) PRIMARY KEY,
    PostID INT FOREIGN KEY REFERENCES BlogPost(PostID) ON DELETE CASCADE,
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    Coment VARCHAR(MAX) NOT NULL,
    CreatedAt DATE
);

--create table Likes
CREATE TABLE Likes (
    LikeID INT IDENTITY(1, 1) PRIMARY KEY,
    PostID INT FOREIGN KEY REFERENCES BlogPost(PostID) ON DELETE CASCADE,
    UserID INT FOREIGN KEY REFERENCES Users(UserID) 
);


	--inserting into users table
INSERT INTO Users (UserName, Email, hashedPassword, Role)
VALUES
    ('JohnDoe', 'johndoe@example.com', 'hashed123', 'User'),
    ('JaneSmith', 'janesmith@example.com', 'hashed456', 'Admin'),
    ('BobJohnson', 'bobjohnson@example.com', 'hashed789', 'User');

	--inserting into comments table
INSERT INTO BlogPost (UserID, Title, BlogDesc, Content, Category, CreatedAt, UpdatedAt)
VALUES
    (1, 'First Post', 'This is my first blog post', 'Content of the first post', 'General', GETDATE(), GETDATE()),
    (2, 'Hello World', 'Welcome to my blog', 'Content of the hello world post', 'Introduction', GETDATE(), GETDATE()),
    (3, 'Tips and Tricks', 'Learn some useful tips', 'Content of the tips and tricks post', 'Tutorials', GETDATE(), GETDATE());

	--inserting into comments table
INSERT INTO Comments (PostID, UserID, Coment, CreatedAt)
VALUES
    (1, 2, 'Great post!', GETDATE()),
    (1, 3, 'I enjoyed reading this', GETDATE()),
    (2, 1, 'Looking forward to more posts', GETDATE());


	--inserting into Likes table
INSERT INTO Likes (PostID, UserID)
VALUES
    (1, 2),
    (2, 3),
    (3, 1);

										--QUERIES
										--Users Table:

	--Retrieve all users:
	SELECT * FROM Users;

	--Retrieve a specific user by UserID:
	SELECT * FROM Users WHERE UserID = UserID;

	--Retrieve users with a specific role:
	SELECT * FROM Users WHERE Role = Role;


										--BlogPost Table:

--Retrieve all blog posts:
SELECT * FROM BlogPost;

--Retrieve a specific blog post by PostID:
SELECT * FROM BlogPost WHERE PostID = 2;

--Retrieve blog posts by a specific user:
SELECT * FROM BlogPost WHERE UserID = 1;


--Retrieve blog posts with a specific category:
SELECT * FROM BlogPost WHERE Category = 'Tutorials';

--Delete a blogPost
DELETE FROM BlogPost WHERE PostID = 3


										--Comments Table:
--Retrieve all comments:
SELECT * FROM Comments;


--Retrieve comments for a specific blog post:
SELECT * FROM Comments WHERE PostID = 1;

--Retrieve comments by a specific user:
SELECT * FROM Comments WHERE UserID = 1;

										--Likes Table:

-- Retrieve all likes:
SELECT * FROM Likes;

--Retrieve likes for a specific blog post:
SELECT * FROM Likes WHERE PostID = 1;

--Retrieve likes by a specific user:
SELECT * FROM Likes WHERE UserID = 1;



