package net.whichones.common.lines.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;

@Entity
@Table(name="section")
@SequenceGenerator(name = "", sequenceName = "", allocationSize=1)
public class Section extends AbstractDataObject{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2549731896898570265L;
	private String name;
	private Integer id;
	private Integer index;
	/**
	 * @return the name
	 */
	@Column(name="section_name")
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "")
	@Column(name="section_id")
	public Integer getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * @return the index
	 */
	public Integer getIndex() {
		return index;
	}
	/**
	 * @param index the index to set
	 */
	@Column(name="section_index")
	public void setIndex(Integer index) {
		this.index = index;
	}

}
