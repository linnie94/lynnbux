# lynnbux - ☕ Coffee POS System

A simple Point of Sale system for a coffee shop with 4 menu items, tip functionality, and Google Sheets integration for order tracking and inventory management.

## Features

- **4 Coffee Menu Items**: Espresso, Cappuccino, Latte, Americano
- **Shopping Cart**: Add/remove items with quantity controls
- **Tip Calculation**: Percentage-based (15%, 18%, 20%, 25%) or custom tip amounts
- **Google Sheets Integration**: Automatic order logging and inventory tracking
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Calculations**: Subtotal, tip, and total calculations

## Files Included

- `index.html` - Main POS interface
- `style.css` - Styling for the application
- `script.js` - Frontend JavaScript functionality
- `google-apps-script.js` - Backend Google Apps Script code
- `README.md` - This file

## Setup Instructions

### 1. Basic Setup (Frontend Only)

1. Download all files to a folder
2. Open `index.html` in a web browser
3. The POS system will work without Google Sheets integration (orders will be logged to console)

### 2. Google Sheets Integration Setup

#### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Coffee POS Orders" (or any name you prefer)
4. Copy the Spreadsheet ID from the URL (the long string between `/spreadsheets/d/` and `/edit`)

#### Step 2: Set up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code in the editor
4. Copy and paste the entire contents of `google-apps-script.js` into the editor
5. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID
6. Save the project (give it a name like "Coffee POS Backend")

#### Step 3: Deploy the Apps Script

1. In the Apps Script editor, click "Deploy" → "New deployment"
2. Click the gear icon next to "Type" and select "Web app"
3. Set the following:
   - **Description**: Coffee POS Backend
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click "Deploy"
5. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/[SCRIPT_ID]/exec`)

#### Step 4: Connect Frontend to Backend

1. Open `script.js` in a text editor
2. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the Web App URL you copied
3. Save the file

#### Step 5: Test the Setup

1. Open `index.html` in a web browser
2. Add some items to the cart
3. Add a tip
4. Click "Complete Order"
5. Check your Google Sheet - you should see two new tabs: "Orders" and "Inventory"

## Usage

### Making an Order

1. **Add Items**: Click "Add to Cart" on any coffee item
2. **Adjust Quantities**: Use the +/- buttons in the cart
3. **Add Tip**: 
   - Click one of the percentage buttons (15%, 18%, 20%, 25%)
   - Or enter a custom tip amount in dollars
4. **Complete Order**: Click "Complete Order" to process the sale

### Managing the System

- **View Orders**: Check the "Orders" tab in your Google Sheet
- **View Inventory**: Check the "Inventory" tab to see total sales and revenue per item
- **Clear Cart**: Refresh the page to start over

## Google Sheets Data Structure

### Orders Sheet
- **Order ID**: Unique identifier for each order
- **Timestamp**: When the order was placed
- **Items**: List of items ordered
- **Quantities**: Quantity of each item
- **Item Totals**: Total cost for each item
- **Subtotal**: Order subtotal
- **Tip**: Tip amount
- **Total**: Final total

### Inventory Sheet
- **Item Name**: Coffee type
- **Total Sold**: Number of items sold
- **Revenue**: Total revenue per item

## Customization

### Adding New Menu Items

1. **Update HTML**: Add new menu items to `index.html`
2. **Update Google Apps Script**: Add new items to the `initialItems` array in `google-apps-script.js`
3. **Update Images**: Replace placeholder images with actual product photos

### Changing Prices

1. Update the `data-price` attribute in `index.html`
2. Update the displayed price in the HTML

### Styling

- Modify `style.css` to change colors, fonts, and layout
- The design is responsive and uses CSS Grid for layout

## Troubleshooting

### Common Issues

1. **Orders not saving to Google Sheets**
   - Check that the Google Apps Script URL is correct in `script.js`
   - Verify the Spreadsheet ID is correct in `google-apps-script.js`
   - Make sure the Apps Script is deployed as a web app with "Anyone" access

2. **CORS Errors**
   - This is expected when testing locally
   - The system will still work when deployed to a web server

3. **Permission Errors**
   - Make sure the Google Apps Script has permission to access your Google Sheets
   - Run the `testSetup()` function in Apps Script to verify permissions

### Testing

1. **Test Apps Script**: Run the `testSetup()` function in Google Apps Script
2. **Test Frontend**: Open browser developer tools and check the console for errors
3. **Test Integration**: Complete a test order and verify it appears in your Google Sheet

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and submit pull requests for improvements!

## Support

For issues or questions, please create an issue in the project repository.
