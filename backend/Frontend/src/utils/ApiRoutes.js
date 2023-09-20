export const host ="http://localhost:5000"

export const signUpStudent=`${host}/api/students/signup`;
export const logInStudent=`${host}/api/students/login`;
export const getStudentInfo=`${host}/api/students/student`; //id
export const upDateStudentInfo=`${host}/api/students/updateinfo`; //id
export const upDateStudentImg=`${host}/api/students/updateimg`; //id

export const upLoadProject=`${host}/api/projects/projectupload`;
export const upDateProjectFile=`${host}/api/projects/updateprojectfile`; //id
export const getProjects=`${host}/api/projects/getprojects`;
export const getProject=`${host}/api/projects/getproject`; //id
export const getCode=`${host}/api/projects/getcode`;