package net.whichones.common.database.data;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;

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
}
