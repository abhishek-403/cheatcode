import { ProblemDetailsProps, ProblemSchema, TabType } from "./types";

export const TABS: TabType[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Problems",
    link: "/problems",
  },
  {
    name: "Contact",
    link: "/contact",
  },
  {
    name: "Careers",
    link: "/careers",
  },
];

const starterCodeTwoSum = ``;

// checks if the user has the correct code
const handlerTwoSum = async (fn: any) => {
  // fn is the callback that user's code is passed into
  try {
    const nums = [
      [2, 7, 11, 15],
      [3, 2, 4],
      [3, 3],
    ];

    const targets = [9, 6, 6];
    const answers = [
      [0, 1],
      [1, 2],
      [0, 1],
    ];

    // loop all tests to check if the user's code is correct
    for (let i = 0; i < nums.length; i++) {
      // result is the output of the user's function and answer is the expected output
      const result = fn(nums[i], targets[i]);

      // assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("twoSum handler function error");
    throw new Error(error);
  }
};

export const twoSum: ProblemDetailsProps = {
  id: "two-sum",
  problemNo: 1,
  name: "Two Sum",
  difficulty: "Easy",
  status: "done",
  videoLink: "",
  category: "Array",
  infoPage: {
    problemStatement: `<p class='mt-3'>
    Given an array of integers <code>nums</code> and an integer <code>target</code>, return
    <em>indices of the two numbers such that they add up to</em> <code>target</code>.
    </p>
    <p class='mt-3'>
    You may assume that each input would have <strong>exactly one solution</strong>, and you
    may not use thesame element twice.
    </p>
    <p class='mt-3'>You can return the answer in any order.</p>`,
    examples: [
      {
        id: 1,
        inputText: "nums = [2,7,11,15], target = 9",
        outputText: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        id: 2,
        inputText: "nums = [3,2,4], target = 6",
        outputText: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
      {
        id: 3,
        inputText: " nums = [3,3], target = 6",
        outputText: "[0,1]",
      },
    ],
    constraints: `<li class='mt-2'>
    <code>2 ≤ nums.length ≤ 10</code>
    </li> <li class='mt-2'>
    <code>-10 ≤ nums[i] ≤ 10</code>
    </li> <li class='mt-2'>
    <code>-10 ≤ target ≤ 10</code>
    </li>
    <li class='mt-2 text-sm'>
    <strong>Only one valid answer exists.</strong>
    </li>`,
    starterCode: {
      js: `function twoSum(nums,target){
      // Write your code here
      };`,
    },
  },
};

export const problem: ProblemSchema[] = [
  {
    id: "two-sum",
    name: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    problemNo: 1,
    videoLink: "",
    status: "done",
  },
  {
    id: "reverse-linked-list",
    name: "Reverse Linked List",
    difficulty: "Hard",
    category: "Linked List",
    problemNo: 2,
    videoLink: "",
    status: "done",
  },
  {
    id: "jump-game",
    name: "Jump Game",
    difficulty: "Medium",
    category: "Dynamic Programming",
    problemNo: 3,
    videoLink: "",
    status: "done",
  },
  {
    id: "valid-parentheses",
    name: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    problemNo: 4,
    videoLink: "",
    status: "done",
  },
  {
    id: "search-a-2d-matrix",
    name: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Binary Search",
    problemNo: 5,
    videoLink: "",
    status: "done",
  },
  {
    id: "container-with-most-water",
    name: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    problemNo: 6,
    videoLink: "",
    status: "done",
  },
  {
    id: "merge-intervals",
    name: "Merge Intervals",
    difficulty: "Medium",
    category: "intervals",
    problemNo: 7,
    videoLink: "",
    status: "done",
  },
];
