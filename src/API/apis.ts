import { Baseurl } from "../Constants/urls";
import axios from "axios";



export class API{
    public getToken = ()=>{
        if (localStorage.getItem('token')==null)
            return ''
        return "Token "+JSON.parse(localStorage.getItem('token') || '');
    }
    private header ={
        headers:{
            "Authorization": this.getToken()
        }
    };
    private studentdata  = Baseurl+'students?roll=';
    private substudentdata  = Baseurl+'students';
    private result = Baseurl + 'Result?roll=';
    private attendanceCount = Baseurl + 'Count?roll=';
    private getSubjectMarks = Baseurl + 'CSMarks?roll=';
    private saveSubjectMarksurl = Baseurl + 'CSMarks';
    private getcourseurl = Baseurl + 'Courses?cid='
    private getteachersddataurl = Baseurl + 'teachers'
    private fetchsubjectsurl = Baseurl + 'CSub?course='
    private loginurl = Baseurl + 'login'
    private tokenurl = Baseurl + 'generatetoken'
    private gettokenurl = Baseurl + 'token'
    private validateurl = Baseurl + 'validate'
    private teachersurl = Baseurl + 'teachers?roll='
    private parentsurl = Baseurl + 'parents?roll='
    private postparentsurl = Baseurl + 'parents'
    private noticeurl = Baseurl + 'notice?cid='
    private postnoticeurl = Baseurl + 'notice'
    private posttaskurl = Baseurl + 'task'
    private registerurl = Baseurl + 'register'
    private taskurl = Baseurl + 'task?cid='
    public fetchStudentData = (roll: string | number)=>{ 
          return axios.get(this.studentdata+roll,this.header);
     }
     public fetchStudentResult = (roll: string | number)=>{ 
        return axios.get(this.result+roll,this.header);
   }
   public fetchAttendanceCount = (roll: string | number)=>{ 
    return axios.get(this.attendanceCount+roll,this.header);
    }
    public fetchSubjectMarks = (roll: string | number,sub: string | undefined)=>{ 
        return axios.get(this.getSubjectMarks+roll+"&sub_name="+sub,this.header);
        }
        public saveSubjectMarks = (data)=>{ 
            return axios.post(this.saveSubjectMarksurl,data,this.header);
            }
    public SubmitStudentData = (data)=>{ 
        return axios.post(this.substudentdata,data,this.header);
        }
    public getCourses = (cid=0)=>{ 
            return axios.get(this.getcourseurl+cid,this.header);
            }
    public fetchTeachersData = ()=>{ 
        return axios.get(this.getteachersddataurl,this.header);
        }
    public fetchSubjects = (courseid=0)=>{ 
        return axios.get(this.fetchsubjectsurl+courseid,this.header);
        }
    public login = (data)=>{ 
        return axios.post(this.loginurl,data);
        }
        public saveToken = (data)=>{ 
            return axios.post(this.gettokenurl,data,this.header);
            }
        public validateToken = ()=>{ 
            return axios.get(this.validateurl,this.header);
            }
        public getTeachersData = (roll: string | number)=>{ 
            return axios.get(this.teachersurl+roll,this.header);
            }
            public getParentsData = (roll: string | number)=>{ 
                return axios.get(this.parentsurl+roll,this.header);
                }
        public getNotices = (cid: string | number)=>{ 
            return axios.get(this.noticeurl+cid,this.header);
            }
        public postNotices = (data)=>{ 
            return axios.post(this.postnoticeurl,data,this.header);
            }
        public getTasks = (cid: string | number)=>{ 
            return axios.get(this.taskurl+cid,this.header);
            }
        public postTasks = (data)=>{ 
            return axios.post(this.posttaskurl , data,this.header);
            }
            public postParentsData = (data)=>{ 
                return axios.post(this.postparentsurl , data,this.header);
                }
        public registerUser = (data)=>{ 
            return axios.post(this.registerurl , data,this.header);
            }
            public logout = ()=>{
                localStorage.clear();
            return {"status":"success"}
            }
    }