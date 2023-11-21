import { Baseurl } from "../Constants/urls";
import axios from "axios";
export class API{
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
    
    public fetchStudentData = (roll: string | number)=>{ 
          return axios.get(this.studentdata+roll);
     }
     public fetchStudentResult = (roll: string | number)=>{ 
        return axios.get(this.result+roll);
   }
   public fetchAttendanceCount = (roll: string | number)=>{ 
    return axios.get(this.attendanceCount+roll);
    }
    public fetchSubjectMarks = (roll: string | number,sub: string | undefined)=>{ 
        return axios.get(this.getSubjectMarks+roll+"&sub_name="+sub);
        }
        public saveSubjectMarks = (data)=>{ 
            return axios.post(this.saveSubjectMarksurl,data);
            }
    public SubmitStudentData = (data)=>{ 
        return axios.post(this.substudentdata,data);
        }
    public getCourses = (cid=0)=>{ 
            return axios.get(this.getcourseurl+cid);
            }
    public fetchTeachersData = ()=>{ 
        return axios.get(this.getteachersddataurl);
        }
    public fetchSubjects = (courseid=0)=>{ 
        return axios.get(this.fetchsubjectsurl+courseid);
        }
    public login = (data)=>{ 
        return axios.post(this.tokenurl,data);
        }
        public saveToken = (data)=>{ 
            return axios.post(this.gettokenurl,data);
            }
        public validateToken = ()=>{ 
            return axios.get(this.validateurl);
            }
        public getTeachersData = (roll: string | number)=>{ 
            return axios.get(this.teachersurl+roll);
            }
            public getParentsData = (roll: string | number)=>{ 
                return axios.get(this.parentsurl+roll);
                }
    }