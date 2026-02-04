const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const random = require('random');

const FILE_PATH = './data.json';
const git = simpleGit();

/**
 * Calculates the date based on x (weeks ago) and y (days ago from that week).
 * x: 0 = this week, 52 = 52 weeks ago.
 * y: 0 = Sunday (or today depending on config), 6 = Saturday.
 * GitHub graph usually: x is weeks, y is days (Sun-Sat).
 */
const makeCommit = async (x, y) => {
    // Calculate date: Subtract x weeks and y days from today? 
    // Or strictly align with GitHub grid where x=0 is "this week" and y is specific day?
    // Requirement: "Từ ngày hiện tại -> Trừ đi x tuần -> Trừ đi y ngày"
    const date = moment()
        .subtract(x, 'w')
        .subtract(y, 'd')
        .format();

    const data = {
        date: date
    };

    console.log(`Creating commit for date: ${date} (x=${x}, y=${y})`);

    // Update dummy file
    await jsonfile.writeFile(FILE_PATH, data);

    // Stage and Commit
    await git.add([FILE_PATH]);
    await git.commit(date, { '--date': date });
};

const generateRandomCommits = async (n) => {
    console.log(`Generating ${n} random commits...`);
    for (let i = 0; i < n; i++) {
        const x = random.int(0, 54); // 0 to 54 weeks
        const y = random.int(0, 6);  // 0 to 6 days
        await makeCommit(x, y);
    }
};

// Example Pattern: Draw a simple line or specific points
const drawPattern = async (points) => {
    // points is array of {x, y}
    console.log(`Drawing pattern with ${points.length} points...`);
    for (const point of points) {
        await makeCommit(point.x, point.y);
    }
};

const run = async () => {
    try {
        // Ensure data.json exists or create it
        await jsonfile.writeFile(FILE_PATH, { date: new Date().toISOString() });
        
        // 1. Random Mode Example
        await generateRandomCommits(50); // Generate 50 random commits

        // 2. Art Mode Example (Uncomment to use)
        // const artPoints = [{x: 10, y: 1}, {x: 10, y: 2}, {x: 10, y: 3}];
        // await drawPattern(artPoints);

        console.log('Pushing changes...');
        await git.push();
        console.log('Done!');
    } catch (err) {
        console.error('Error:', err);
    }
};

run();
