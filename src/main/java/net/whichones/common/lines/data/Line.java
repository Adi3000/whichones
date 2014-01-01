package net.whichones.common.lines.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import net.whichones.common.sheet.Sheet;

import org.codehaus.jettison.json.JSONObject;
import org.hibernate.annotations.Type;

import com.adi3000.common.database.hibernate.data.AbstractDataObject;
import com.adi3000.common.database.hibernate.usertype.JSONObjectUserType;

@Entity
@Table(name="lines")
@SequenceGenerator(name = "", sequenceName = "", allocationSize=1)
public class Line extends AbstractDataObject implements Comparable<Line>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3369287660890190816L;
	private Integer id;
	private Integer index;
	private JSONObject data;
	private Group group;
	private Section section;
	private Sheet sheet;
	/**
	 * @return the id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "")
	@Column(name="line_id")
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
	@Column(name="line_index")
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
	@Column(name="line_data")
	@Type(type="com.adi3000.common.database.hibernate.usertype.JSONObjectUserType")
	public JSONObject getData() {
		return data;
	}
	/**
	 * @param data the data to set
	 */
	public void setData(JSONObject data) {
		this.data = data;
	}
	/**
	 * @return the group
	 */
	@JoinColumn(name="group_id")
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
	@JoinColumn(name="section_id")
	public Section getSection() {
		return section;
	}
	/**
	 * @param section the section to set
	 */
	public void setSection(Section section) {
		this.section = section;
	}
	/**
	 * @return the sheet
	 */
	@JoinColumn(name="sheet_id")
	public Sheet getSheet() {
		return sheet;
	}
	/**
	 * @param sheet the sheet to set
	 */
	public void setSheet(Sheet sheet) {
		this.sheet = sheet;
	}
	@Override
	public int compareTo(Line o) {
		return this.getFullIndex() - o.getFullIndex();
	}
	@Transient
	private int getFullIndex(){
		int majorIndex = this.index;
		int mediumIndex = this.index;
		int minorIndex = this.index;
		if(section != null && section.getIndex() != null){
			majorIndex = section.getIndex();
			
			if(group != null && group.getIndex() != null){
				mediumIndex = group.getIndex() * 1000;
			}
		}else if(group != null && group.getIndex() != null){
			majorIndex = group.getIndex();
		}
		return (majorIndex * 1000 * 1000) + 
				(mediumIndex * 1000) + 
				minorIndex;
	}
}