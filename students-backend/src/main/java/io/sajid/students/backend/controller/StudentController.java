package io.sajid.students.backend.controller;

import java.util.List;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.sajid.students.backend.model.Student;
import io.sajid.students.backend.service.StudentService;


@CrossOrigin
@RestController
public class StudentController {

	
	@Autowired
	private StudentService studentService;
	
	//for handling post request for student details
	@PostMapping("/send")
	public ResponseEntity<Student> save(@RequestBody Student student) 
	{
		//for validating all details are entered and entered in proper format
		if (student.getUserName() == "" || student.getStandard() == "" || student.getDivision() == "" || student.getGender() == "" || student.getDob() == ""
			|| student.getUserName() == null || student.getStandard() == null || student.getDivision() == null || student.getGender() == null || student.getDob() == null
			 || !(Pattern.matches("^[A-Za-z ]*$",(student.getUserName())))
			 || !(Pattern.matches("^((19|2[0-9])[0-9]{2})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$",(student.getDob()))) 
			 || !(Pattern.matches("^(I{1,3}|I{0,1}V|VI{0,3}|I{0,1}X|XI{0,2})$",(student.getStandard())))
			 || !(Pattern.matches("^(A|B|C)$",(student.getDivision())))
			 || !(Pattern.matches("^(male|female)$",(student.getGender())))
			 ) 
		{ //if validation fails
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE); //sending not accepted status if inputs are not entered properly.
		}
		else //if validation is success
		{
			student.setRollNumber(studentService.getSequenceNumber(student.getSequenceName())); //setting a unique roll number 
			return new ResponseEntity<>(studentService.save(student),HttpStatus.ACCEPTED); //calling save method from service file and sending status as accepted
		}
	}
	
	// for handling get request for all the student details
	@RequestMapping("/getAll") 
	public List<Student> getAll(){
		return studentService.getAll();
	}
	
	// for handling get request for all the student details based name sorting order
	@RequestMapping("/getAllByName")
	public List<Student> getAllSorted(){
		return studentService.getAllSorted();
	}
	
}
