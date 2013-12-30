package net.whichones.common.database.data;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;

@Entity
@Table(name="lines")
public class Line  extends AbstractDataObject{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3369287660890190816L;
	private Integer id;
	private Integer index;
	private Integer data;
	private Group group;
	private Section section;
	/**
	 * @return the id
	 */
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
	public void setIndex(Integer index) {
		this.index = index;
	}
	/**
	 * @return the data
	 */
	public Integer getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public void setData(Integer data) {
		this.data = data;
	}
	/**
	 * @return the group
	 */
	public Group getGroup() {
		return group;
	}
	/**
	 * @param group the group to set
	 */
	public void setGroup(Group group) {
		this.group = group;
	}
	/**
	 * @return the section
	 */
	public Section getSection() {
		return section;
	}
	/**
	 * @param section the section to set
	 */
	public void setSection(Section section) {
		this.section = section;
	}
	
	
}
