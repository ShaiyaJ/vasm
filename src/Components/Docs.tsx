import React from "react";
import Container from "./Container.tsx";

function Docs() {
    return <>
        <Container title={"Documentation"} closed> <br />
            <Container title={"Opcodes"} className={"decreasing-width"} closed> <br />
                <Container title={"HLT"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>HLT</p>
                    <p>The HLT (halt) opcode will terminate the program when run.</p>
                    <p>Programs will automatically terminate if there is no further instructions to run, although it is conventional to end your program with a HLT command despite this behaviour.</p>
                </Container> <br />

                <Container title={"ADD"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>ADD [memory location]</p>
                    <p>The ADD (addition) opcode will add the contents of the accumulator and the value of a memory address. It will store the result in the accumulator.</p>
                    <p>This overwrites the original value stored in the accumulator.</p>
                    <p>In other words, it operates like: </p>
                    <p>&#8195;&#8195;&#8195;&#8195;Accumulator = Accumulator + Value @ address</p>
                </Container> <br />

                <Container title={"SUB"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>ADD [address]</p>
                    <p>The SUB (subtraction) opcode will subtract the contents of the accumulator and the value of a memory address. It will store the result in the accumulator.</p>
                    <p>This overwrites the original value stored in the accumulator.</p>
                    <p>In other words, it operates like: </p>
                    <p>&#8195;&#8195;&#8195;&#8195;Accumulator = Accumulator - Value @ [address]</p>
                </Container> <br />

                <Container title={"STA & STO"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>STA [position <i>or</i> variable name]</p>
                    <p>Stores the value of the accumulator at [position] in memory.</p>
                    <p>This does not overwrite the value of the accumulator.</p>
                    <p>You can also use a named variable, declared with DAT.</p>      
                </Container> <br />

                <Container title={"LDA"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>LDA [position <i>or</i> variable name]</p>                
                    <p>Loads the value at [position] in memory into the accumulator.</p>
                    <p>This does not overwrite the value of the memory location.</p>
                    <p>You can also use a named variable, declared with DAT.</p>
                </Container> <br />

                <Container title={"BRA"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>BRA [name]</p>
                    <p>Switches execution to the position of [name]. [name] is declared before the opcode.</p>
                    <p><b>Example:</b></p>
                    <p>&#8195;&#8195;&#8195;&#8195;BRA example</p>
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;example INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;OUT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>In this example we branch to "example" before hitting the halt instruction on line 2. This means that the program doesn't halt right away, since we effectively skip this instruction.</p>
                    <p>It does this by changing the value of the Program Counter. "example" has a value of line 2 for the program counter - the branch command is at line 0. Line 1 is skipped when switching from 0 to 2 in the Program Counter.</p>
                </Container> <br />

                <Container title={"BRZ"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>BRZ [name]</p>
                    <p>Switches execution to the position of [name] <i>if the value in the accumulator is zero</i>. [name] is declared before the opcode.</p>
                    <p><b>Example:</b></p>
                    <p>&#8195;&#8195;&#8195;&#8195;BRA example</p>
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;example INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;OUT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>In this example we branch to "example" before hitting the halt instruction on line 2. This means that the program doesn't halt right away, since we effectively skip this instruction.</p>
                    <p>It does this by changing the value of the Program Counter. "example" has a value of line 2 for the program counter - the branch command is at line 0. Line 1 is skipped when switching from 0 to 2 in the Program Counter.</p>
                </Container> <br />

                <Container title={"BRP"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>BRP [name]</p>
                    <p>Switches execution to the position of [name] <i>if the value in the accumulator is positive.</i>. [name] is declared before the opcode.</p>
                    <p><b>Example:</b></p>
                    <p>&#8195;&#8195;&#8195;&#8195;BRA example</p>
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;example INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;OUT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>In this example we branch to "example" before hitting the halt instruction on line 2. This means that the program doesn't halt right away, since we effectively skip this instruction.</p>
                    <p>It does this by changing the value of the Program Counter. "example" has a value of line 2 for the program counter - the branch command is at line 0. Line 1 is skipped when switching from 0 to 2 in the Program Counter.</p>
                </Container> <br />

                <Container title={"INP"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>INP</p>
                    <p>Prompts the user for an input and stores the result in the accumulator.</p>
                    <p>If the input is not a number, then it will return a "NaN" type.</p>
                </Container> <br />

                <Container title={"OUT"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>OUT</p>
                    <p>Outputs the numeric contents of the accumulator to the user.</p>
                </Container> <br />

                <Container title={"OTC"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>OUT</p>
                    <p>Converts the numeric value of the accumulator into ASCII and outputs the converted text content to the user.</p>
                </Container> <br />

                <Container title={"DAT"} className={"decreasing-width"} closed>
                    <p><b>Format: </b>[name] DAT [initial value]</p>   
                    <p>Declares a named variable with an identifier [name] with a value [initial value].</p>
                    <p>Named variables are assigned a memory location corresponding to the position that they're declared in the program. Overwriting this location will overwrite the contents of the variable.</p>
                    <p>Variables can be used in place of memory locations in the operands (parameters) of opcodes.</p>
                    <p>This can make code more readable. And storing initial values allows you to declare constants which automate the setup of your programs.</p>
                </Container> <br />
            </Container>       


            <Container title={"Structured lessons"} className={"decreasing-width"} closed>
                <p>This section is designed for beginners of LMC to learn how to use the app.</p>

                <Container title={"Lesson 1 - Concept behind LMC"} className={"decreasing-width"} closed>
                    <p>LMC is first and foremost an abstraction.</p>
                    <p>Some concepts introduced in LMC are accurate to how real processors work. However, LMC only loosely translates to the real world.</p>
                    <ul>
                        <li>The language uses a different syntax to conventional assembly</li>
                        <li>The instruction set is limited</li>
                        <li>It doesn't model parallel processing</li>
                        <li>RAM access times are instant</li> 
                    </ul>
                    <p>Despite this, LMC is still useful for learning an abstracted version of the inner workings of the CPU and Von Neumann architecture. So, I will run through those import concepts here.</p>

                    <p><b>The CPU's fetch-execute cycle</b></p>
                    <p>The fetch-execute cycle (sometimes referred to as the fetch-decode-execute cycle) is the cycle that the CPU undergoes in order to run programs.</p>
                    <p>To execute instructions, the processor needs a few things:</p>
                    <ol>
                        <li>The address and data of the current instruction</li>
                        <li>The address of the next instruction</li>
                        <li>Results of previous instructions</li>
                    </ol>
                    
                    <p>The CPU uses the following registers to keep track of all of this information:</p>
                    <ul>
                        <li>PC (program counter): This keeps track of the address of the next instruction. It increments automatically, which points it to the next instruction.</li>
                        <li>MAR (memory address register): This acts as a pointer to the address of any data required to complete the instruction.</li>
                        <li>MDR (memory data register): This temporarily keeps hold of the current data that is moving between the processor and main memory.</li>
                        <li>CIR (current instruction register): This is similar to the MDR, it keeps hold of the current data and instruction. But the MDRs data gets overwritten later in the fetch-execute cycle, so the CIR needs to hold a copy of this data.</li>
                        <li>ACC (accumulator): This holds the result of any arithmetic, logical or bit shift operation.</li>
                    </ul>

                    <p>Actual execution involves these steps:</p>
                    <ol>
                        <li>Address of the next instruction is copied from the Program Counter to the MAR.</li>
                        <li>The instruction held at the MAR is copied into the MDR. Then the Program Counter increments.</li>
                        <li>The contents of the MAR is then copied into the CIR.</li>
                        <li>The instruction in the CIR is decoded.</li>
                        <li>The instruction is split into opcodes and operands.</li>
                        <li>The program is then sent to the ALU for execution.</li>
                        <li>The result of this execution is stored in the accumulator </li>
                    </ol>

                    <p><b>Von Neumann architecture</b></p>
                    <p>Instructions and data are stored in a common main memory and transferred using a single shared bus.</p>
                    <p>This kind of architecture leads to bottlenecks, as there are more addresses in memory to search through and all resources are competing over the same bus line.</p>
                    <p>However, it is the simplest to conceptualise - and is still used today.</p>
                    <p><b>These concepts are enough to carry you through LMC.</b></p>
                </Container>

                <Container title={"Lesson 2 - First program"} className={"decreasing-width"} closed>
                    <p>For our first program, we'll take in some user input and store it in a memory location.</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;STA 99</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>Let's run through each instruction</p>
                    <p><b>INP</b> takes some user input and stores it in the accumulator</p>
                    <p><b>STA 99</b> stores the value of the accumulator into memory location 99</p>
                    <p><b>HLT</b> halts execution of the program</p>
                    <p>It can help to visualise what the contents of memory location 99 and the accumulator is through the course of the program. Let's run the program with the input "1".</p>
                    <p>&#8195;&#8195;&#8195;&#8195;        <i>Accumulator, Loc 99</i></p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP     <i>1, 0</i></p>
                    <p>&#8195;&#8195;&#8195;&#8195;STA 99  <i>1, 1</i></p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT     <i>1, 1</i></p>
                    <p>This is equivalent to x = input() in Python.</p>
                </Container>

                <Container title={"Lesson 3 - Performing operations on data"} className={"decreasing-width"} closed>
                    <p>Now we can take user input, we should perform operations on that data.</p>
                    <p>Let's copy and paste the code we wrote so we take two inputs.</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;STA 99</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;STA 99</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>The second INP instruction will overwrite the contents of the accumulator. But the second STA 99 instruction will also overwrite the 99th memory location. This program completely destroys the first input.</p>
                    <p>So let's change the code in order to perform an addition operation instead of a store operation on the second input.</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;STA 99</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;ADD 99</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>Now the first input is stored in memory location 99, and the second is stored in the accumulator. During the ADD operation we overwrite the second input with the result of "position 99 + acc".</p>
                    <p>In high level terms, it is comparable to this:</p>
                    <p>&#8195;&#8195;&#8195;&#8195;x = input()</p>
                    <p>&#8195;&#8195;&#8195;&#8195;y = input()</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;accumulator = x + y</p>
                    <p>The program requires you to manually read memory locations at the moment. So let's add some output to simplify this for you.</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;STA 99</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;ADD 99</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;OUT</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>Now this is comparable to this high level program:</p>
                    <p>&#8195;&#8195;&#8195;&#8195;x = input()</p>
                    <p>&#8195;&#8195;&#8195;&#8195;y = input()</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;print(x + y)</p>
                    <p>Now we have performed an operation on data.</p>
                </Container>

                <Container title={"Lesson 4 - Helping readability with named variables"} className={"decreasing-width"} closed>
                    <p>In the previous lesson we were dealing with raw memory locations. This may have been very confusing for you, but you can help make your code more readable (and, thus, understandable) by using named variables.</p>
                    <p>You can also help your program with comments! Comments can only be done at the end of a line with "//".</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;STA 99</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP</p>
                    <p>&#8195;&#8195;&#8195;&#8195;ADD 99</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;OUT</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>We may want to store our two inputs in some named variables. For example, "inp1" and "inp2".</p>
                    <p>To achieve this we will use the DAT operand.</p>
                    <p>&#8195;&#8195;&#8195;&#8195;inp1 DAT 0</p>
                    <p>&#8195;&#8195;&#8195;&#8195;inp2 DAT 0</p>
                    <p>Here we set up 2 variables, and we give them initial values of 0.</p>
                    <p>Now we must replace the memory locations in the main program. I will add comments at the same time to help you follow along with execution.</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP      // Input 1</p>
                    <p>&#8195;&#8195;&#8195;&#8195;STA inp1</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT</p>
                    <p>&#8195;&#8195;&#8195;&#8195;INP      // Input 2</p>
                    <p>&#8195;&#8195;&#8195;&#8195;STA inp2 // I added this line so that we can keep the value for inp2</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;ADD inp1 // The previous line didn't overwrite the accumulator, so we don't need a load instruction</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;OUT      // Output</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;HLT      // Execution end</p>
                </Container>

                <Container title={"Lesson 5 - Introducing branches"} className={"decreasing-width"} closed>
                    <p>Now we're going to add branches. Branches are important since they break the natural and sequential flow of execution - allowing for conditional <i>branching</i> execution.</p>
                    <p>In other words, this is an if statement. Except you cannot check against an expression. You can only check if the accumulator is 0 or positive.</p>
                    <p>In our current program, we perform x + y. But what if the user wanted x - y?</p>
                    <p>Let's separate the addition and subtraction into separate branches.</p>
                    <p>&#8195;&#8195;&#8195;&#8195;addop LDA inp1</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;ADD inp2</p> <br />
                    <p>&#8195;&#8195;&#8195;&#8195;subop LDA inp1</p> 
                    <p>&#8195;&#8195;&#8195;&#8195;SUB inp2</p>
                    <p>Now, let's make a main execution which:</p>
                    <ol>
                        <li>Grabs user input for the first number</li>
                        <li>Grabs user input for the operation</li>
                        <li>Grabs user input for the second number</li>
                        <li>Branches depending on the operation</li>
                        <li>Prints the value</li>
                        <li>Ends execution</li>
                    </ol>

                    <p>The final code will be daunting at first, but I will explain the whole program.</p>
                    <p>&#8195;BRA main</p>
                    <p>&#8195;</p>
                    <p>&#8195;// --- Add ---</p>
                    <p>&#8195;addop LDA inp1</p>
                    <p>&#8195;ADD inp2</p>
                    <p>&#8195;BRA output</p>
                    <p>&#8195;// ---</p>
                    <p>&#8195;</p>
                    <p>&#8195;// --- Sub ---</p>
                    <p>&#8195;subop LDA inp1</p>
                    <p>&#8195;SUB inp2</p>
                    <p>&#8195;BRA output</p>
                    <p>&#8195;// ---</p>
                    <p>&#8195;</p>
                    <p>&#8195;</p>
                    <p>&#8195;</p>
                    <p>&#8195;// --- Main ---</p>
                    <p>&#8195;main INP   // First input</p>
                    <p>&#8195;STA inp1</p>
                    <p>&#8195;INP        // Operation input</p>
                    <p>&#8195;STA inpop  </p>
                    <p>&#8195;INP        // Third input</p>
                    <p>&#8195;STA inp2</p>
                    <p>&#8195;</p>
                    <p>&#8195;LDA inpop     // Checking Add branch</p>
                    <p>&#8195;SUB checkadd</p>
                    <p>&#8195;BRZ addop     // (if inpop - checkadd == 0 then inpop is 1)</p>
                    <p>&#8195;</p>
                    <p>&#8195;LDA inpop     // Checking Sub branch</p>
                    <p>&#8195;SUB checksub</p>
                    <p>&#8195;BRZ subop     // (if inpop - checksub == 0 then inpop is 1)</p>
                    <p>&#8195;// ---</p>
                    <p>&#8195;</p>
                    <p>&#8195;// --- Output ---</p>
                    <p>&#8195;output OUT</p>
                    <p>&#8195;HLT</p>
                    <p>&#8195;// ---</p>
                    <p>&#8195;</p>
                    <p>&#8195;</p>
                    <p>&#8195;// --- Variables ---</p>
                    <p>&#8195;inp1 DAT 0</p>
                    <p>&#8195;inpop DAT 0</p>
                    <p>&#8195;inp2 DAT 0</p>
                    <p>&#8195;checkadd DAT 1</p>
                    <p>&#8195;checksub DAT 2</p>
                    <p>&#8195;// ---</p>
                    <p>The comments help with the readability:</p>
                    <p><b>Firstly</b>, a branch instruction is called that jump execution to the main branch. This main branch calls 3 sets of input and store instructions. inp1 is the first argument in the mathematical expression. inpop is the operation in the expression (1 for add, 2 for subtract). inp2 is the second argument in the mathematical expression.</p>
                    <p><b>Secondly</b>, the branches are checked. This takes the value for inpop and subtracts the constants checkadd and checksub. If this returns 0 then we know that inpop is equal to checkadd or checksub. </p>
                    <p>Here is a worked example of this step since it is the most complicated. If the user has inputted 2 for the inpop (which is subtract), then "inpop - checkadd" is "2 - 1" which is equal to 1. So we know they don't want the add operation. "inpop - checksub" is "2 - 2" which is 0. We know they want the subtract operation so we use BRZ (branch if zero) to branch our code to the subop branch.</p>
                    <p><b>Thirdly</b>, the equivalent operation is called which will either use the ADD or SUB opcodes and then branch to the output branch.</p>
                    <p><b>Finally</b>, the output branch runs the OUT opcode before halting the program.</p>
                    <p>We have a working calculator!</p>
                    <p><b>My challenge is to add a third input. Stored in inp3. With the plus operation this would mean "inp1 + inp2 + inp3", with the minus operation this would mean "inp1 - inp2 - inp3"</b></p>
                </Container>

                <Container title={"Lesson 6 - Unrelated tips and tricks"} className={"decreasing-width"} closed>
                    <p>Throughout these lessons we've created a program that works like a basic calculator. In a high level language this would be one of the first things you would make to test your programming abilities.</p>
                    <p>However, due to the unconventional nature of LMC, some additional tips and tricks will be explained that are unrelated to this program that we've made.</p>
                    <p><b>Declaring main:</b></p>
                    <p>In most programming languages they will have an <i>entry point</i>. This is a single function that runs first.</p>
                    <p>In C, C++ and Rust this entry function is always called <i>main</i>.</p>
                    <p>LMC starts executing from the first line downwards. So you can achieve a similar effect by making your first line in your program branch to <i>main</i>. This allows you to write all your utility functions after this point. With good use of spaces and comments, you can section your code in a readable way.</p>
                    <p><b>Creating utilities with branches and makeshift registers:</b></p>
                    <p>LMC doesn't have functions with parameters. However, you can achieve a similar result by declaring <i>registers</i> and <i>branches</i>.</p>
                    <p>Registers can be a group of named variables - such as "RAX", "RBX", "RCX". These act as pseudo-parameters that the utility function can operate on.</p>
                    <p>Branches are the names of the utility function.</p>
                    <p>The most common utility you will want is a MUL and DIV operation. So declare branches "MUL" and "DIV".</p>
                    <p>Registers "RAX" and "RBX" will stores the inputs to these custom instructions.</p>
                </Container>
            </Container>

            <Container title={"Example programs"} className={"decreasing-width"} closed>
                <p>Below is a list of example programs that you can use to learn LMC:</p>
                <Container title={"Taking and storing user input"} className={"decreasing-width"} closed>
                    <p>&#8195;INP</p>
                    <p>&#8195;STA var</p>
                    <p>&#8195;</p>
                    <p>&#8195;var DAT 0</p>
                </Container>

                <Container title={"Conditionals (if statement)"} className={"decreasing-width"} closed>
                    <p>&#8195;BRA main</p>
                    <p>&#8195;</p>
                    <p>&#8195;option_one OUT</p>
                    <p>&#8195;HLT</p>
                    <p>&#8195;</p>
                    <p>&#8195;option_two OUT</p>
                    <p>&#8195;OUT</p>
                    <p>&#8195;HLT</p>
                    <p>&#8195;</p>
                    <p>&#8195;option_else OUT</p>
                    <p>&#8195;OUT</p>
                    <p>&#8195;OUT</p>
                    <p>&#8195;HLT</p>
                    <p>&#8195;</p>
                    <p>&#8195;main INP</p>
                    <p>&#8195;STA user_choice</p>
                    <p>&#8195;</p>
                    <p>&#8195;LDA user_choice</p>
                    <p>&#8195;SUB option_one_constant</p>
                    <p>&#8195;BRZ option_one</p>
                    <p>&#8195;</p>
                    <p>&#8195;LDA user_choice</p>
                    <p>&#8195;SUB option_two_constant</p>
                    <p>&#8195;BRZ option_two</p>
                    <p>&#8195;</p>
                    <p>&#8195;BRA option_else</p>
                    <p>&#8195;</p>
                    <p>&#8195;option_one_constant DAT 1</p>
                    <p>&#8195;option_two_constant DAT 2</p>
                    <p>&#8195;user_choice DAT 0</p>
                </Container>

                <Container title={"Conditional loops"} className={"decreasing-width"} closed>
                    <p>&#8195;loop INP</p>
                    <p>&#8195;SUB ten</p>
                    <p>&#8195;BRZ end</p>
                    <p>&#8195;BRA loop</p>
                    <p>&#8195;</p>
                    <p>&#8195;end HLT</p>
                    <p>&#8195;</p>
                    <p>&#8195;</p>
                    <p>&#8195;ten DAT 10</p>
                </Container>

                <Container title={"Count controlled loop"} className={"decreasing-width"} closed>
                    <p>&#8195;LDA i</p> 
                    <p>&#8195;</p>
                    <p>&#8195;loop OUT</p>
                    <p>&#8195;LDA i</p>
                    <p>&#8195;SUB one</p>
                    <p>&#8195;STA i</p>
                    <p>&#8195;BRZ end_loop</p>
                    <p>&#8195;BRA loop</p>
                    <p>&#8195;</p>
                    <p>&#8195;end_loop HLT</p>
                    <p>&#8195;</p>
                    <p>&#8195;i DAT 10</p>
                    <p>&#8195;one DAT 1</p>
                </Container>

                <Container title={"Multiplication"} className={"decreasing-width"} closed>
                    <p>&#8195;multiply LDA total</p>
                    <p>&#8195;ADD factor_two</p>
                    <p>&#8195;STA total</p>
                    <p>&#8195;LDA factor_one</p>
                    <p>&#8195;SUB one</p>
                    <p>&#8195;STA factor_one</p>
                    <p>&#8195;BRZ end</p>
                    <p>&#8195;BRA multiply</p>
                    <p>&#8195;</p>
                    <p>&#8195;</p>
                    <p>&#8195;end LDA total</p>
                    <p>&#8195;OUT</p>
                    <p>&#8195;HLT </p>
                    <p>&#8195;</p>
                    <p>&#8195;factor_one DAT 5</p>
                    <p>&#8195;factor_two DAT 10</p>
                    <p>&#8195;total DAT 0</p>
                    <p>&#8195;one DAT 1</p>
                </Container>
            </Container>
        </Container>
    </>
}

export default Docs;