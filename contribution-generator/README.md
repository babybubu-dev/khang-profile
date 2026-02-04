# GitHub Contribution Generator

A Node.js tool to generate "fake" commit history for your GitHub profile.

## 📦 Installation

```bash
npm install
```

## 🚀 Usage

1. **Random Mode:**
   Edit `index.js` to set the number of commits in `generateRandomCommits(n)`.

   ```javascript
   await generateRandomCommits(100);
   ```

2. **Art Mode:**
   Define an array of coordinates `{x, y}` where `x` is weeks ago and `y` is days ago.

   ```javascript
   await drawPattern([{x: 5, y: 0}, {x: 5, y: 1}]);
   ```

3. **Run:**

   ```bash
   node index.js
   ```

## ⚠️ Important

- This tool modifies your git history. Use with caution.
- Ensure "Show private contributions" is enabled on your GitHub profile if using in a private repo.
- This script pushes changes automatically at the end.
