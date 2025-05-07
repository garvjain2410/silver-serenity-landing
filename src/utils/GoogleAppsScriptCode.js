
// ===============================================================
// GOOGLE APPS SCRIPT CODE - Copy and paste this to your Apps Script
// ===============================================================
// 
// Instructions:
// 1. Go to script.google.com and create a new project
// 2. Copy this entire code into the script editor
// 3. Create a new Google Sheet and copy its ID from the URL
// 4. Replace YOUR_SHEET_ID with your actual Sheet ID below
// 5. Run the setup() function once to create necessary sheets
// 6. Deploy as a web app:
//    - Click Deploy > New deployment
//    - Select type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
//    - Click Deploy
// 7. Copy the web app URL and set it as VITE_GOOGLE_APPSCRIPT_API_URL in your .env file
//
// ===============================================================

// Configuration
const SHEET_ID = "YOUR_SHEET_ID"; // Replace with your actual Google Sheet ID
const COMMENTS_SHEET_NAME = "BlogComments";

// Run this function once to set up the sheet structure
function setup() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  // Create comments sheet if it doesn't exist
  let commentsSheet = ss.getSheetByName(COMMENTS_SHEET_NAME);
  if (!commentsSheet) {
    commentsSheet = ss.insertSheet(COMMENTS_SHEET_NAME);
    commentsSheet.appendRow([
      "ID", 
      "BlogId", 
      "Name", 
      "Email", 
      "Comment", 
      "Date", 
      "Approved"
    ]);
    commentsSheet.setFrozenRows(1);
  }
  
  return "Setup complete!";
}

// Handle GET and POST requests
function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  let result = { result: "error", message: "Invalid request" };
  
  // Set CORS headers for the preflight request
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  
  // Handle CORS preflight requests
  if (e.parameter.cors === "preflight") {
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
  }
  
  try {
    // For GET requests
    if (e.parameter.action) {
      const action = e.parameter.action;
      
      if (action === "getComments") {
        const blogId = parseInt(e.parameter.blogId);
        result = getComments(blogId);
      }
    } 
    // For POST requests
    else if (e.postData) {
      const data = JSON.parse(e.postData.contents);
      const action = data.action;
      
      if (action === "addComment") {
        result = addComment(data);
      }
    }
  } catch (error) {
    result.message = error.toString();
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}

// Function to get comments for a specific blog post
function getComments(blogId) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(COMMENTS_SHEET_NAME);
    
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    
    // Find column indexes
    const blogIdCol = headers.indexOf("BlogId");
    const idCol = headers.indexOf("ID");
    const nameCol = headers.indexOf("Name");
    const commentCol = headers.indexOf("Comment");
    const dateCol = headers.indexOf("Date");
    const approvedCol = headers.indexOf("Approved");
    
    // Filter comments by blogId and approved status
    const comments = [];
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row[blogIdCol] === blogId && (row[approvedCol] === true || row[approvedCol] === "TRUE" || row[approvedCol] === "")) {
        comments.push({
          id: row[idCol],
          name: row[nameCol],
          comment: row[commentCol],
          date: row[dateCol]
        });
      }
    }
    
    return {
      result: "success",
      comments: comments
    };
  } catch (error) {
    return {
      result: "error",
      message: error.toString()
    };
  }
}

// Function to add a new comment
function addComment(data) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(COMMENTS_SHEET_NAME);
    
    // Get the next ID
    const lastRow = sheet.getLastRow();
    const nextId = lastRow === 1 ? 1 : lastRow;
    
    // Add the new comment
    sheet.appendRow([
      nextId,
      data.blogId,
      data.name,
      data.email,
      data.comment,
      new Date(),
      true // Auto-approve comments (change to false if you want manual approval)
    ]);
    
    return {
      result: "success",
      message: "Comment added successfully"
    };
  } catch (error) {
    return {
      result: "error",
      message: error.toString()
    };
  }
}

// Test function to verify the script is working
function testScript() {
  return "Script is working correctly!";
}
