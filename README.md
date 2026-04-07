# Daily Todo Tracker

Yeh ek simple static web app hai jisme aap har din ke tasks/date/details note kar sakte ho.

## App kaise open karein

### Option 1: Direct open (sabse simple)
1. Project folder kholo: `/workspace/VyaparTrack`
2. `index.html` par double click karo ya browser me drag/drop karo.

### Option 2: Local server se run karo (recommended)
```bash
cd /workspace/VyaparTrack
python3 -m http.server 5500
```
Phir browser me yeh URL kholo:

- `http://localhost:5500`

## Features
- Task title + date + details add kar sakte ho
- Date ke hisaab se filter
- Done/Undo aur Delete actions
- Data browser `localStorage` me save hota hai
