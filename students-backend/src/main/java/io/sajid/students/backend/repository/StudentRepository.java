package io.sajid.students.backend.repository;




import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import io.sajid.students.backend.model.Student;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> { //passing model and Id type to mongorepository.
	
}
