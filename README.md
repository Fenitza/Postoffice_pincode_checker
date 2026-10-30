

# India Post Pincode Checker

A lightweight, responsive web application for looking up Indian post office details using the free India Post Pincode API.

## Features

- Validates that the pincode contains exactly six digits.
- Fetches post office information using the Fetch API and async/await.
- Displays all post offices returned for a pincode.
- Shows post office name, branch type, district, state, division, and pincode.
- Includes a search box to filter post offices by name.
- Displays loading, success, validation, and error messages.
- Handles unknown pincodes, unsuccessful HTTP responses, and network failures.
- Uses plain HTML, CSS, and JavaScript without external libraries.
- Uses DOM methods to render API results safely.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- India Post Pincode API

## API

The application uses the following endpoint:

`https://api.postalpincode.in/pincode/<pincode>`

Replace `<pincode>` with the six-digit Indian pincode.

## How to Run

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a browser.
4. Enter a six-digit pincode.
5. Click **Check Pincode**.
6. Use the filter box to search for a post office by name.

An internet connection is required to retrieve pincode information.

## Test Cases

| Test Pincode | Expected Location | Expected State | Purpose |
|---|---|---|---|
| 110001 | New Delhi | Delhi | Verify successful lookup and post office results. |
| 400001 | Mumbai | Maharashtra | Verify lookup for a pincode in another state. |
| 600001 | Chennai | Tamil Nadu | Verify lookup for a pincode in Tamil Nadu. |

The API may return multiple post offices for each pincode. The application should display all records returned by the API.

These are test pincodes and expected locations. Verify the current API response for the exact post office names and record counts.

## Validation and Error Handling

- Empty input: the browser's required-field validation prevents submission.
- Fewer or more than six digits: displays a validation error.
- Alphabetic or special characters: displays a validation error.
- Unknown pincode: displays a message indicating that no post offices were found.
- HTTP or network failure: displays an error message.
- Successful lookup: displays all returned post offices.
- Filter with no matches: displays an empty result list and a count of zero.

## Project Structure

```text
india-post-pincode-checker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Future Improvements

- Add district and state filters.
- Add automated JavaScript tests.
- Add a retry option for failed API requests.

## License

This project is intended for learning and internal demonstration purposes.