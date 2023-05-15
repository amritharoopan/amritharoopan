import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('test208');

export const createDataBases = () => {
    db.transaction(tx => {
        tx.executeSql('PRAGMA foreign_keys = ON;');
        tx.executeSql('CREATE TABLE roles (role_name char(20) PRIMARY KEY);', null, () => { console.log("created"); });
        tx.executeSql('CREATE TABLE user (id char(20) PRIMARY KEY, password char(50), role char(20), FOREIGN KEY (role) REFERENCES roles(role_name));');
        tx.executeSql('CREATE TABLE teachers (slno integer primary key AUTOINCREMENT, tcode char(20) UNIQUE, first_name char(30),second_name char(30), email char(50), gender char(15), dob date, contact integer(15), address char(100),FOREIGN KEY (tcode) REFERENCES user(id) );');
        tx.executeSql('CREATE TABLE batch (batch_name char(20) PRIMARY KEY, semester char(5), classroom char(10),in_charge char(30),total_student integer(5), FOREIGN key (in_charge) REFERENCES teachers(tcode));');
        tx.executeSql('CREATE TABLE invigilation_schedule (slno integer PRIMARY key AUTOINCREMENT, invigilator char(20), subject char(50),batch char(20), exam_date date, exam_time char(5), block char(10), room char(10), FOREIGN KEY (invigilator) REFERENCES teachers(tcode) );');
        tx.executeSql('CREATE TABLE students (slno INTEGER PRIMARY KEY AUTOINCREMENT, stud_id char(20) UNIQUE, stud_batch char(20), first_name char(30),second_name char(30), email char(50), gender char(15), dob date, contact integer(15), address char(100),FOREIGN KEY (stud_id) REFERENCES user(id), FOREIGN KEY (stud_batch) REFERENCES batch(batch_name));');
        tx.executeSql('CREATE TABLE attendance_register (student_id char(20), exam_id integer, status char(10), PRIMARY KEY(student_id, exam_id), FOREIGN KEY(student_id) REFERENCES students(stud_id), FOREIGN KEY(exam_id) REFERENCES invigilation_schedule(slno));');
        tx.executeSql('CREATE table subjects ( subject_name char(50) primary key,  t_code char(20), FOREIGN KEY (t_code) REFERENCES teachers(tcode));');
        tx.executeSql('CREATE TABLE exam_seat (seat_no char(5) , stud_id char(20), room_no char(10), PRIMARY key (seat_no, room_no), FOREIGN KEY (stud_id) REFERENCES students(stud_id));', null, () => { console.log("last tabe done"); });

    });
}

export const loadDummyData = () => {
    db.transaction(tx => {
        tx.executeSql("INSERT into roles VALUES ('student')");
        tx.executeSql("INSERT into roles VALUES ('teacher')");


        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA18001', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA18018', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA18040', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA18064', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA18077', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA18051', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA18080', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA18067', 'pass','student')");

        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA20023', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA20013', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA20019', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA20036', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA20040', 'pass','student')");
        tx.executeSql("INSERT into user VALUES ('KH.SC.I5MCA20038', 'pass','student')");




        tx.executeSql("INSERT into user VALUES ('teacher.101', 'pass','teacher')");
        tx.executeSql("INSERT into user VALUES ('teacher.102', 'pass','teacher')");
        tx.executeSql("INSERT into user VALUES ('teacher.103', 'pass','teacher')");


        tx.executeSql("INSERT INTO teachers (tcode,first_name,second_name,email,gender,dob,contact,address) VALUES ('teacher.101','Nima','Nair','janedoe@a.in','female','1982-05-22',9895959595,'some house at some where')");
        tx.executeSql("INSERT INTO teachers (tcode,first_name,second_name,email,gender,dob,contact,address) VALUES ('teacher.102','Deepak','E S','mjane@a.in','male','1988-08-02',9995559990,'some house at some where')");


        tx.executeSql("INSERT INTO batch VALUES ( '2018 Int MCA','8th','203','teacher.101',30 );");
        tx.executeSql("INSERT INTO batch VALUES ( '2020 Int MCA','8th','203','teacher.102',30 );");



        tx.executeSql("INSERT INTO invigilation_schedule (invigilator,subject,batch,exam_date,exam_time,block,room) VALUES ('teacher.101','Artificial Intelligence', '2020 Int MCA','2023-06-15','08:00','D','200');");
        tx.executeSql("INSERT INTO invigilation_schedule (invigilator,subject,batch,exam_date,exam_time,block,room) VALUES ('teacher.102','Computer Graphics', '2018 Int MCA','2023-06-16','08:00','D','200');");
        tx.executeSql("INSERT INTO invigilation_schedule (invigilator,subject,batch,exam_date,exam_time,block,room) VALUES ('teacher.101','Python Programming', '2020 Int MCA','2023-06-18','15:00','D','206');");
        tx.executeSql("INSERT INTO invigilation_schedule (invigilator,subject,batch,exam_date,exam_time,block,room) VALUES ('teacher.101','Cryptography and Cyber Security', '2020 Int MCA','2023-06-20','15:00','D','206');");


        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA18001','2018 Int MCA','Abhirami','A','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA18018','2018 Int MCA','Gayathri','Varma','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA18040','2018 Int MCA','Sreenidhi','Shenoi','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA18064','2018 Int MCA','Parvathy','Ranjith','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA18077','2018 Int MCA','Aparna','TS','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA18051','2018 Int MCA','Bhadra','Nair','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA18080','2018 Int MCA','Athira','Shaji','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA18067','2018 Int MCA','Shini','Salim','some_email','female','1999-08-02',9995559990,'some house at some where');");

        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA20023','2020 Int MCA','G','Avani','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA20013','2020 Int MCA','Devika','BR','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA20019','2020 Int MCA','Uthara','Sethuraj','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA20036','2020 Int MCA','Ashrin','Kabeer','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA20040','2020 Int MCA','Hridya','Sabu','some_email','female','1999-08-02',9995559990,'some house at some where');");
        tx.executeSql("INSERT INTO students (stud_id,stud_batch,first_name,second_name,email,gender,dob,contact,address) VALUES ('KH.SC.I5MCA20038','2020 Int MCA','Gopika','Panicker','some_email','female','1999-08-02',9995559990,'some house at some where');");



        tx.executeSql("insert INTO subjects VALUES( 'Artificial Intelligence', 'teacher.101');");
        tx.executeSql("insert INTO subjects VALUES( 'Python Programming', 'teacher.102');");
        tx.executeSql("insert INTO subjects VALUES( 'Computer Graphics', 'teacher.101');");
        tx.executeSql("insert INTO subjects VALUES( 'Cryptography and Cyber Security', 'teacher.103');");


        tx.executeSql("insert into exam_seat values ('001','KH.SC.I5MCA18001','D107');")
        tx.executeSql("insert into exam_seat values ('002','KH.SC.I5MCA20023','D107');")
        tx.executeSql("insert into exam_seat values ('003','KH.SC.I5MCA18018','D107');")
        tx.executeSql("insert into exam_seat values ('004','KH.SC.I5MCA20013','D107');")
        tx.executeSql("insert into exam_seat values ('005','KH.SC.I5MCA18040','D107');")
        tx.executeSql("insert into exam_seat values ('006','KH.SC.I5MCA20019','D107');")
        tx.executeSql("insert into exam_seat values ('007','KH.SC.I5MCA18064','D107');")
        tx.executeSql("insert into exam_seat values ('008','KH.SC.I5MCA20036','D107');")
        tx.executeSql("insert into exam_seat values ('009','KH.SC.I5MCA18077','D107');")
        tx.executeSql("insert into exam_seat values ('010','KH.SC.I5MCA20040','D107');")
        tx.executeSql("insert into exam_seat values ('011','KH.SC.I5MCA18051','D107');")
        tx.executeSql("insert into exam_seat values ('012','KH.SC.I5MCA20038','D107');")
        tx.executeSql("insert into exam_seat values ('013','KH.SC.I5MCA18080','D107');")
        tx.executeSql("insert into exam_seat values ('014','KH.SC.I5MCA18067','D107');")

    });
}

export const selectData = () => {
    db.transaction(tx => {
        tx.executeSql("select * from user", null,
            (txObj, resultSet) => console.log(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });
}


export const checkLogin = (username, password, callBack) => {
    console.log("inside    " + username + "    " + password);
    db.transaction(tx => {
        tx.executeSql("select * from user where id = '" + username + "' and password = '" + password + "'", null,
            (txtObj, resultSet) => callBack(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });

    console.log("outside");
}

export const getInvigilationSchedule = (id, callBack) => {
    db.transaction(tx => {
        tx.executeSql("select * from invigilation_schedule INNER JOIN  batch on invigilation_schedule.batch = batch.batch_name WHERE invigilation_schedule.invigilator = '" + id + "'", null,
            (txObj, resultSet) => callBack(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });
}

export const getInvigilationFromSlNo = (id, callBack) => {
    db.transaction(tx => {
        tx.executeSql("select * from invigilation_schedule INNER JOIN  batch on invigilation_schedule.batch = batch.batch_name WHERE invigilation_schedule.slno = '" + id + "'", null,
            (txObj, resultSet) => callBack(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });
}

export const registerAttendance = (student_id, exam_id, status, callBackSuccess, callBackFailure) => {
    db.transaction(tx => {
        tx.executeSql("INSERT INTO attendance_register VALUES ('" + student_id + "'," + exam_id + ",'" + status + "')", null,
            (txObj, resultSet) => callBackSuccess(),
            (txObj, error) => callBackFailure(error.message == 'UNIQUE constraint failed: attendance_register.student_id, attendance_register.exam_id (code 1555 SQLITE_CONSTRAINT_PRIMARYKEY)' ? 'Attendance already marked for the student' : 'Something went wrong, Please try again later')
        )

        tx.executeSql("select * from students", null,)
    });
}

export const checkIfStudentIsAttending = (stud_id, batch_name, callBack) => {
    db.transaction(tx => {
        tx.executeSql("select * from students where stud_id = '" + stud_id + "' and stud_batch = '" + batch_name + "';", null,
            (txObj, resultSet) => callBack(resultSet.rows.length > 0),
            (txObj, error) => console.log(error.message)
        )
    });
}

export const getStudentsFromBatch = (batch_name, callBack) => {
    db.transaction(tx => {
        tx.executeSql("SELECT * from students left outer JOIN attendance_register on  students.stud_id = attendance_register.student_id where stud_batch = '" + batch_name + "' ORDER BY first_name COLLATE NOCASE", null,
            (txObj, resultSet) => callBack(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });
}

export const getTeachersTimeTable = (t_code, callBack) => {
    db.transaction(tx => {
        tx.executeSql("SELECT * FROM subjects INNER JOIN invigilation_schedule on subjects.subject_name = invigilation_schedule.subject WHERE subjects.t_code = '" + t_code + "' ORDER BY exam_date", null,
            (txObj, resultSet) => callBack(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });
}


export const getStudentInfo = (stud_id, callBack) => {
    db.transaction(tx => {
        tx.executeSql("select * from students inner join batch on students.stud_batch = batch.batch_name where stud_id = '" + stud_id + "'", null,
            (txtObj, resultSet) => callBack(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });

}

export const getSeats = (stud_id, callBack) => {
    db.transaction(tx => {
        tx.executeSql("SELECT * from exam_seat WHERE room_no = (SELECT room_no from exam_seat where stud_id = '" + stud_id + "') ", null,
            (txtObj, resultSet) => callBack(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });

}

export const getRoomNo = (stud_id, callBack) => {
    db.transaction(tx => {
        tx.executeSql("SELECT room_no from exam_seat where stud_id = '" + stud_id + "' ", null,
            (txtObj, resultSet) => callBack(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });
}


export const getStudentsTimeTable = (stud_id, callBack) => {
    db.transaction(tx => {
        tx.executeSql("SELECT * from invigilation_schedule where batch = (SELECT stud_batch from students WHERE stud_id ='" + stud_id + "');", null,
            (txtObj, resultSet) => callBack(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });

}

export const selectuser = () => {
    db.transaction(tx => {
        tx.executeSql("SELECT * from user;", null,
            (txtObj, resultSet) => console.log(resultSet.rows._array),
            (txObj, error) => console.log(error.message)
        )
    });
}








