import React, { useState } from 'react'
import mainContext from './mainContext'


export default function MainState(props) {
    const [navbarRender,setNavbarRender]=useState(false);
    const [code,setCode]=useState(`
    import React, { useState } from 'react';
    import SyntaxHighlighter from 'react-syntax-highlighter';
    import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
    
    function CodeEditor() {
        const codeString = '(num) => num + 1';
    
        return (
            <div className="grid grid-rows-[auto,1fr] gap-3 w-full   p-4">
                <div className="bg-gray-900 text-white text-center border-l-[1px] border-gray-400 rounded py-2">
                    <h2 className="text-xl font-semibold opacity-90">CODE SECTION</h2>
                </div>
                <div className="max-w-2xl min-w-[25rem] bg-[#3a404d] rounded-md overflow-hidden ">
                    <SyntaxHighlighter language="javascript"
                    style={atomOneDark}
                    customStyle={{
                        padding: '25px'
                    }}
                    >
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    }
    
    export default CodeEditor;
`)
  return (
    <mainContext.Provider value={{
      navbarRender,setNavbarRender,
      code,setCode,
    }}>
    {props.children}
    </mainContext.Provider>
  )
}
