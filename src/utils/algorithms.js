// Disk Scheduling Algorithms implementation

export const simulateAlgorithms = (requests, initialHead, maxTrack, direction) => {
  // Common preparations
  const reqs = [...requests];
  const head = initialHead;

  return {
    FCFS: calculateFCFS(reqs, head),
    SSTF: calculateSSTF(reqs, head),
    SCAN: calculateSCAN(reqs, head, maxTrack, direction),
    CSCAN: calculateCSCAN(reqs, head, maxTrack, direction),
    LOOK: calculateLOOK(reqs, head, direction),
    CLOOK: calculateCLOOK(reqs, head, direction)
  };
};

const calculateFCFS = (reqs, head) => {
  let sequence = [head, ...reqs];
  let seekTime = 0;
  for (let i = 0; i < sequence.length - 1; i++) {
    seekTime += Math.abs(sequence[i] - sequence[i + 1]);
  }
  return { sequence, seekTime };
};

const calculateSSTF = (reqs, head) => {
  let sequence = [head];
  let seekTime = 0;
  let currentHead = head;
  let remaining = [...reqs];

  while (remaining.length > 0) {
    let closestIndex = -1;
    let minDistance = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      let distance = Math.abs(currentHead - remaining[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    currentHead = remaining[closestIndex];
    sequence.push(currentHead);
    seekTime += minDistance;
    remaining.splice(closestIndex, 1);
  }

  return { sequence, seekTime };
};

const calculateSCAN = (reqs, head, maxTrack, direction) => {
  let sequence = [head];
  let seekTime = 0;
  let currentHead = head;

  let left = reqs.filter(r => r < head).sort((a, b) => a - b);
  let right = reqs.filter(r => r >= head).sort((a, b) => a - b);

  if (direction === 'Towards 0') {
    // Go to 0 first
    left.reverse().forEach(r => sequence.push(r));
    if (sequence[sequence.length - 1] !== 0 && left.length > 0) sequence.push(0); // Sweep to 0
    // Sometimes sweep to 0 even if no requests, but usually only if we have left requests or if that's the sweep boundary. Let's sweep to boundary if we have requests on the other side.
    if (!sequence.includes(0) && right.length > 0) sequence.push(0);

    right.forEach(r => sequence.push(r));
  } else {
    // Go to max first
    right.forEach(r => sequence.push(r));
    if (sequence[sequence.length - 1] !== maxTrack && right.length > 0) sequence.push(maxTrack);
    if (!sequence.includes(maxTrack) && left.length > 0) sequence.push(maxTrack);

    left.reverse().forEach(r => sequence.push(r));
  }

  // Ensure unique sequence if duplicates happened at boundary
  sequence = sequence.filter((v, i, a) => i === 0 || v !== a[i - 1]);

  for (let i = 0; i < sequence.length - 1; i++) {
    seekTime += Math.abs(sequence[i] - sequence[i + 1]);
  }

  return { sequence, seekTime };
};

const calculateCSCAN = (reqs, head, maxTrack, direction) => {
  let sequence = [head];
  let seekTime = 0;

  let left = reqs.filter(r => r < head).sort((a, b) => a - b);
  let right = reqs.filter(r => r >= head).sort((a, b) => a - b);

  if (direction === 'Towards 0') {
    left.reverse().forEach(r => sequence.push(r));
    if (sequence[sequence.length - 1] !== 0) sequence.push(0);
    if (right.length > 0) {
      sequence.push(maxTrack); // Jump to MAX
      right.reverse().forEach(r => sequence.push(r));
    }
  } else {
    right.forEach(r => sequence.push(r));
    if (sequence[sequence.length - 1] !== maxTrack) sequence.push(maxTrack);
    if (left.length > 0) {
      sequence.push(0); // Jump to 0
      left.forEach(r => sequence.push(r));
    }
  }

  sequence = sequence.filter((v, i, a) => i === 0 || v !== a[i - 1]);

  for (let i = 0; i < sequence.length - 1; i++) {
    seekTime += Math.abs(sequence[i] - sequence[i + 1]);
  }

  return { sequence, seekTime };
};

const calculateLOOK = (reqs, head, direction) => {
  let sequence = [head];
  let seekTime = 0;

  let left = reqs.filter(r => r < head).sort((a, b) => a - b);
  let right = reqs.filter(r => r >= head).sort((a, b) => a - b);

  if (direction === 'Towards 0') {
    left.reverse().forEach(r => sequence.push(r));
    right.forEach(r => sequence.push(r));
  } else {
    right.forEach(r => sequence.push(r));
    left.reverse().forEach(r => sequence.push(r));
  }

  sequence = sequence.filter((v, i, a) => i === 0 || v !== a[i - 1]);

  for (let i = 0; i < sequence.length - 1; i++) {
    seekTime += Math.abs(sequence[i] - sequence[i + 1]);
  }

  return { sequence, seekTime };
};

const calculateCLOOK = (reqs, head, direction) => {
  let sequence = [head];
  let seekTime = 0;

  let left = reqs.filter(r => r < head).sort((a, b) => a - b);
  let right = reqs.filter(r => r >= head).sort((a, b) => a - b);

  if (direction === 'Towards 0') {
    left.reverse().forEach(r => sequence.push(r));
    if (right.length > 0) {
      right.reverse().forEach(r => sequence.push(r));
    }
  } else {
    right.forEach(r => sequence.push(r));
    if (left.length > 0) {
      left.forEach(r => sequence.push(r));
    }
  }

  sequence = sequence.filter((v, i, a) => i === 0 || v !== a[i - 1]);

  for (let i = 0; i < sequence.length - 1; i++) {
    seekTime += Math.abs(sequence[i] - sequence[i + 1]);
  }

  return { sequence, seekTime };
};
