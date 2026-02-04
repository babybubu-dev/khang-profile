const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';
const git = simpleGit();

/**
 * Calculates the date based on x (weeks ago) and y (days ago from that week).
 * x: 0 = this week, 52 = 52 weeks ago.
 * y: 0 = Sunday (or today depending on config), 6 = Saturday.
 */
const makeCommit = async (x, y) => {
    const date = moment()
        .subtract(x, 'w')
        .subtract(y, 'd')
        .format();

    const data = {
        date: date
    };

    // console.log(`Creating commit for date: ${date} (x=${x}, y=${y})`);

    // Update dummy file
    await jsonfile.writeFile(FILE_PATH, data);

    // Stage and Commit
    await git.add([FILE_PATH]);
    await git.commit(date, { '--date': date });
};

const generateRandomCommits = async (n) => {
    console.log(`Generating ${n} random commits...`);
    for (let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * 55); // 0 to 54 weeks
        const y = Math.floor(Math.random() * 7);  // 0 to 6 days
        await makeCommit(x, y);
    }
};

const run = async () => {
    try {
        // Ensure data.json exists or create it
        await jsonfile.writeFile(FILE_PATH, { date: new Date().toISOString() });
        
        // Generate 500 random commits
        await generateRandomCommits(500);

        console.log('Pushing changes...');
        await git.push();
        console.log('Done!');
    } catch (err) {
        console.error('Error:', err);
    }
};

run();
