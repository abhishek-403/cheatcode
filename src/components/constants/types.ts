export type TabType = {
  name: string;
  link: string;
};

export type ProblemSchema = {
  id: string;
  problemNo: number;
  name: string;
  difficulty: string;
  status: string;
  videoLink: string;
  category: string;
};
export interface ProblemExampleProps{
  id:number;
  imageUrl?:string;
  inputText:string;
  outputText:string;
  explanation?:string;
}
export interface ProblemDetailsProps extends ProblemSchema {
    problemStatement:string;
    examples:ProblemExampleProps[];
    constraints:string;
    starterCode:string;
}